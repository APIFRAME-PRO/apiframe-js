# apiframe-js
Node.js library for [APIFRAME.PRO](https://apiframe.pro) (Midjourney API)

API Documentation is available at https://docs.apiframe.pro

Example

```js
const ApiframeClient = require('apiframe-js');
const APIFRAME_API_KEY = ""; // YOUR API KEY HERE

const Client = new ApiframeClient(APIFRAME_API_KEY, false);

(async () => {

    const res = await Client.imagine({
        prompt: "a nice day in the desert with my dog",
        aspect_ratio: "3:2",
        process_mode: "fast",
        webhook_url: "https://mywebsite.com/webhook/update"
    });

    console.log(res);
})();
```