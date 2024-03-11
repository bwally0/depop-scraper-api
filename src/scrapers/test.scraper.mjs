import { loadPageContent } from '../utils/scraper.utils.mjs';

const scrapeSellerInfo = async (sellerId) => {
  try {
    const $ = await loadPageContent(`https://www.depop.com/${sellerId}`);

    // q iconLink
    const iconElement = $('img.sc-jGFluD');
    const iconLink = $(iconElement).attr('src');

    // q isVerified
    const verifiedIcon = $('svg.sc-fWYGza');
    let isVerified = false;
    if (verifiedIcon.length > 0) {
      isVerified = true;
    }

    // q rating and numReviews
    const feedbackButton = $('button[data-testid="feedback-btn"]');
    const feedbackText = $(feedbackButton).attr('aria-label');
    const numPattern = /\d+(\.\d+)?/g;
    const numMatches = feedbackText.match(numPattern);

    const rating = parseFloat(numMatches[1]);
    const numReviews = parseInt(numMatches[0]);

    // q numSold
    const soldText = $('div[data-testid="signals__sold"]').find('p').text();
    let numSold = 0;
    if (soldText.length > 0) {
      const numMatch = soldText.match(numPattern);
      numSold = parseInt(numMatch);
    }

    // q status, followers, following, shopName
    const status = $('div[data-testid="signals__active"]').find('p').text();
    // parse text to int?
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
    console.error(error);
  }
};

export { scrapeSellerInfo };
