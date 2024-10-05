import { loadPageContent, openReviews } from '../utils/scraper.utils.mjs';

const scrapeSellerInfo = async (sellerId) => {
  try {
    const $ = await loadPageContent(`https://www.depop.com/${sellerId}`);

    const iconElement = $('img._userImage--lg_zs7wz_57._userImageShared_zs7wz_34');
    const iconLink = $(iconElement).attr('src');

    const verifiedIcon = $('svg._verifiedBadge_zs7wz_93');
    let isVerified = false;
    if (verifiedIcon.length > 0) {
      isVerified = true;
    }

    const feedbackButton = $('button[data-testid="buttonLink"]');
    const starsWrapper = $('svg[class="styles_stars__Ca377"]');
    let stars = 0;

    $(starsWrapper).each((index, element) => {
      let star = $(element).find('title').text();
        if(star === 'Full Star') {
          stars++;
        }
    });

    const feedbackText = $(feedbackButton).find('p').text();
    let numReviewsText = feedbackText.replace(/[()]/g, "");
    let numReviews = parseInt(numReviewsText)


    const numPattern = /\d+(\.\d+)?/g;
    const soldText = $('div[class="styles_signal__D2W6L"]').find('p').text();
    let numSold = 0;
    if (soldText.length > 0) {
      const numMatch = soldText.match(numPattern);
      numSold = parseInt(numMatch);
    }

    const status = $('div.styles_signal__D2W6L p').text().replace(/\d+(\.\d+)?/g, "").replace("sold", "").trim();

    
    // // TODO Parse to integer
    const followersText = $('span._text_bevez_41._shared_bevez_6._bold_bevez_47').eq(0).text();
    const followingText = $('span._text_bevez_41._shared_bevez_6._bold_bevez_47').eq(1).text();
    const shopName = $('p._text_bevez_41._shared_bevez_6._bold_bevez_47.styles_sellerName__GcDDz').text();

    const data = {
      sellerId: sellerId,
      iconLink: iconLink,
      isVerified: isVerified,
      pageLink: `https://www.depop.com/${sellerId}/`,
      rating: stars,
      numReviews: numReviews,
      numSold: numSold,
      status: status,
      numFollowers: followersText,
      numFollowing: followingText,
      shopName: shopName,
    };

    return data;
  } catch (error) {
    throw error;
  }
};

const scrapeSellerProducts = async (sellerId) => {
  try {
    const $ = await loadPageContent(`https://www.depop.com/${sellerId}`);
    
    const productList = [];
    $('ul[data-testid="product__items"] li').each((index, element) => {
      const productLink = $(element).find('a[data-testid="product__item"]').attr('href');

      const productIdMatches = productLink.match(/\/products\/(.*)/);
      const productId = productIdMatches ? productIdMatches[1].replace(/\/$/, '') : null;

      const thumbnailLink = $(element).find('img.sc-htehQK.fmdgqI').attr('src');

      let fullPrice = null;
      let discountedPrice = null;

      const priceElement = $(element).find('p[aria-label="Price"]');
      if (priceElement.length) {
        fullPrice = priceElement.text();
      }
      
      const fullPriceElement = $(element).find('p[aria-label="Full price"]');
      if (fullPriceElement.length) {
        fullPrice = fullPriceElement.text();
      }
      
     const discountedPriceElement = $(element).find('p[aria-label="Discounted price"]');
      if (discountedPriceElement.length) {
        discountedPrice = discountedPriceElement.text();
      }

      const product = {
        productId: productId,
        productLink: `https://www.depop.com${productLink}`,
        thumbnailLink: thumbnailLink,
        fullPrice: fullPrice,
        discountedPrice: discountedPrice,
      }

      productList.push(product);
    })

    return productList;
  } catch (error) {
    throw error;
  } 
};

const scrapeSellerFeedback = async (sellerId) => {
  let feedbackArray = [];

  try {
    const $ = await openReviews(`https://www.depop.com/${sellerId}`); 
    
    const divElement = $('div[class="styles_container__bdAwq"]');
    

    $(divElement).each((index, element) => {


      let reviewText = $(element).find('p._text_bevez_41._shared_bevez_6._normal_bevez_51:first').text();
      let date = $(element).find('p._text_bevez_41._shared_bevez_6._normal_bevez_51._caption1_bevez_55').text();
      let userHref = $(element).find('.styles_unstyledLink__DsttP.styles_username__QOq9a').text();

      let starsSVG = $(element).find('svg.styles_stars__Ca377');
      let stars = 0;

      $(starsSVG).each((index, element) => {
        let star = $(element).find('title').text();
        if(star === 'Full Star') {
          stars++;
        }
      });

      const rating = {
        username: userHref,
        review: reviewText,
        starCount: stars,
        timeSinceReview: date
        }

      feedbackArray.push(rating);
      

    });

    return feedbackArray;

  } catch (error) {
    throw error;
  }
};

export { scrapeSellerInfo, scrapeSellerProducts, scrapeSellerFeedback };
