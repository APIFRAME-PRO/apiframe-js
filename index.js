const axios = require('axios').default;
const FormData = require('form-data');

const Joi = require('joi');

class ApiframeClient {
    constructor(apiKey, verbose = false) {
        this.baseURL = 'https://api.apiframe.pro';
        this.apiKey = apiKey;
        this.verbose = verbose;

        if (!apiKey) {
            throw new Error('The apiKey is required!');
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/imagine
     *
     *  Generate an image using a text prompt. This is the /imagine command on Discord.
     *
     * @returns {Promise<string>} task_id
     */
    async imagine({
        prompt,
        aspect_ratio = '1:1',
        process_mode = 'fast',
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {            
            Joi.assert(
                prompt,
                Joi.string()
                    .min(3)
                    .max(1000),
                    new Error('\n[ERROR] "prompt" should be a string (min: 3, max: 1000)\n'),
            );
            Joi.assert(
                aspect_ratio,
                Joi.string()
                    .pattern(/^\d+:\d+$/)
                    .message('\n[ERROR] "aspect_ratio" should be a string like "3:2"\n'),
            );
            Joi.assert(
                process_mode,
                Joi.string().valid('fast', 'turbo').required(),
                new Error('\n[ERROR] "process_mode" should be fast or turbo\n')
            );
            Joi.assert(
                webhook_url,
                Joi.string()
                    .optional()
                    .uri({ allowRelative: false })
                    .message('\n[ERROR] "webhook_url" should be a URL if set\n'),
            );
        } catch (error) {
            console.error(error?.message);
            return;
        }

        try {
            const data = JSON.stringify({
                prompt,
                aspect_ratio,
                process_mode,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/imagine`,
                headers: {
                    Authorization: this.apiKey,
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            const { data: responseData } = await axios.request(config);

            if (this.verbose) {
                console.log({
                    response: responseData,
                });
            }

            return {
                ...responseData,
            };
        } catch (error) {
            console.log("\n[ERROR] " + error?.response?.data?.errors?.at(0)?.msg + " \n");
            return;
        }
    }
}

module.exports = ApiframeClient;
