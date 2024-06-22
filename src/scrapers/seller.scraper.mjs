import { loadPageContent, openReviews } from '../utils/scraper.utils.mjs';

const scrapeSellerInfo = async (sellerId) => {
  try {
    const $ = await loadPageContent(`https://www.depop.com/${sellerId}`);

    const iconElement = $('img.sc-jGFluD');
    const iconLink = $(iconElement).attr('src');

    const verifiedIcon = $('svg.sc-fWYGza');
    let isVerified = false;
    if (verifiedIcon.length > 0) {
      isVerified = true;
    }

    const feedbackButton = $('button[data-testid="feedback-btn"]');
    const feedbackText = $(feedbackButton).attr('aria-label');
    const numPattern = /\d+(\.\d+)?/g;
    const numMatches = feedbackText.match(numPattern);

    const rating = parseFloat(numMatches[1]);
    const numReviews = parseInt(numMatches[0]);

    const soldText = $('div[data-testid="signals__sold"]').find('p').text();
    let numSold = 0;
    if (soldText.length > 0) {
      const numMatch = soldText.match(numPattern);
      numSold = parseInt(numMatch);
    }

    const status = $('div[data-testid="signals__active"]').find('p').text();
    // TODO Parse to integer
    const followersText = $('p[data-testid="followers__count"]').text();
    const followingText = $('p[data-testid="following__count"]').text();
    const shopName = $('p.styles__ShopNameText-sc-30d6819b-13').text();

    const data = {
      sellerId: sellerId,
      iconLink: iconLink,
      isVerified: isVerified,
      pageLink: `https://www.depop.com/${sellerId}/`,
      rating: rating,
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
    
    const divElement = $('div[data-testid="feedback__item"]');

    $(divElement).each((index, element) => {


      let reviewText = $(element).find('p.sc-eDnWTT.styles__FeedbackText-sc-31728946-5.kcKICQ.DFAai').text();
      let date = $(element).find('p.sc-eDnWTT.ePldeT').text();
      let userHref = $(element).find('.sc-eDnWTT.styles__UserName-sc-31728946-3.fRxqiS.imcoQs').text();

      let starsSVG = $(element).find('.styles__Stars-sc-9964bcfb-0.cPAkcV svg');
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
