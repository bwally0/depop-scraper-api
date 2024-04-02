# Depop Scraper API
Web Scraper API for https://www.depop.com/.
Allows sellers and developers to retrieve publically available Depop shop information for integration into their personal websites or use in analytical tools.

## Tools Used
* [Node.js](https://nodejs.org/): javascript runtime environment
* [Express](https://www.expresjs.org/): node.js web framework
* [Puppeteer](https://pptr.dev/): web page crawling
* [Cheerio](https://cheerio.js.org/): html parser

## Install and Run Locally
Prerequesities:
1. [Node.js](https://nodejs.org/) and npm

Build:
``` shell
git clone https://github.com/bwaldropw/depop-scraper-api.git
cd depop-scraper-api
npm install
```

Run:
``` shell
npm start
```

## API Endpoints
Currently runs locally on port `3000`.

### Seller Endpoints
| Endpoint | Method | URL Params | Description |
| --- | --- | --- | --- |
| `/seller/info` | GET | sellerId: String | get general info about seller |
| ~~`/seller/products`~~ | GET | sellerId : String, ~~limit: Integer~~ | WIP get list of recent seller products |
| ~~`/seller/feedback`~~ | GET | type: String, type: 'sold' or 'purchased' | WIP get recent seller reviews |

### Product Endpoints
| Endpoints | Method | URL Params | Description |
| --- | --- | --- | --- |
| ~~`/product/info`~~ | GET | productId: String | WIP get product information |

### Example
Running locally on `http://localhost:3000`

``` javascript
const axios = require('axios');

axios.get('http://localhost:3000/seller/info', {
    params: {
        sellerId: 'internetgirl'
    }
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});
```

Expected Response:
``` JSON
{
  "sellerId": "internetgirl",
  "iconLink": "https://media-photos.depop.com/b0/2692588/829470274_2264f6948266436197159faa1ec3f219/U1.jpg",
  "isVerified": true,
  "pageLink": "https://www.depop.com/internetgirl/",
  "rating": 5,
  "numReviews": 33155,
  "numSold": 69394,
  "status": "Active today",
  "numFollowers": "377K",
  "numFollowing": "114",
  "shopName": "iGirl 🎀’s shop"
}
```

### Todos
- [ ] get `/seller/products`
- [ ] get `/seller/feedback`
- [ ] get `/product/info`
