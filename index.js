const axios = require('axios').default;
const FormData = require('form-data');

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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/upscales/upscale-1x
     *
     *  Upscale one of the 4 generated images by the Imagine endpoint to get a single image.
     *
     * @returns {Promise<string>} task_id
     */
    async upscale_1x({
        parent_task_id,
        index,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                index,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/upscale-1x`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/upscales/upscale-creative-and-subtle
     *
     *  The Upscale (Subtle) option doubles the size of your image and keeps details very similar to the original adds Upscale (Creative) adds details to the image. Of course you first need to Upscale 1x.
     *
     * @returns {Promise<string>} task_id
     */
    async upscale_alt({
        parent_task_id,
        type,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                type,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/upscale-alt`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/upscales/upscale-2x-and-4x
     *
     *  Upscale any image to higher resolution, this is not from Midjourney. Image must not be larger than 2048x2048.
     *
     * @returns {Promise<string>} task_id
     */
    async upscale_highres({
        parent_task_id,
        type,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                type,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/upscale-highres`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/reroll
     *
     *  Reroll to create new images from a previous Imagine task.
     *
     * @returns {Promise<string>} task_id
     */
    async reroll({
        parent_task_id,
        prompt = undefined,
        aspect_ratio = '1:1',
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                prompt,
                aspect_ratio,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/reroll`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/variations
     *
     *  Create 4 new variations of one of the 4 generated images by the Imagine request.
     *
     * @returns {Promise<string>} task_id
     */
    async variations({
        parent_task_id,
        index,
        prompt = undefined,
        aspect_ratio = '1:1',
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                index,
                prompt,
                aspect_ratio,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/variations`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/inpaint
     *
     *  Redraw a selected area of an image. Of course you first need to Upscale 1x. (Vary Region)
     *
     * @returns {Promise<string>} task_id
     */
    async inpaint({
        parent_task_id,
        mask,
        prompt = undefined,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                mask,
                prompt,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/inpaint`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/outpaint
     *
     *  The outpaint endpoint enlarges an image's canvas beyond its original size while keeping the contents of the original image unchanged. Of course you first need to Upscale 1x. (Zoom Out)
     *
     * @returns {Promise<string>} task_id
     */
    async outpaint({
        parent_task_id,
        zoom_ratio,
        aspect_ratio = '1:1',
        prompt = undefined,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                zoom_ratio,
                aspect_ratio,
                prompt,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/outpaint`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/pan
     *
     *  Broadens the image canvas in a specific direction, keeping the original content intact and using prompts and the original image as guides for filling the expanded area. You first need to Upscale 1x
     *
     * @returns {Promise<string>} task_id
     */
    async pan({
        parent_task_id,
        direction,
        prompt = undefined,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                parent_task_id,
                direction,
                prompt,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/pan`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/describe
     *
     *  Writes four example prompts based on an image you upload. This is the same as using the /describe command in Discord.
     *
     * @returns {Promise<string>} task_id
     */
    async describe({
        image_url,
        process_mode = 'fast',
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                image_url,
                process_mode,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/describe`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/blend
     *
     *  Blend multiple images into one image.
     *
     * @returns {Promise<string>} task_id
     */
    async blend({
        image_urls,
        dimension = 'square',
        process_mode = 'fast',
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                image_urls,
                dimension,
                process_mode,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/blend`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/seed
     *
     *  Get the seed of a generated image.
     *
     * @returns {Promise<string>} task_id
     */
    async seed({ task_id, webhook_url = undefined, webhook_secret = undefined }) {
        try {
            const data = JSON.stringify({
                task_id,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/seed`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/faceswap
     *
     *  Swap the face on a target image with the face on a provided image. Each image must contain only one face.
     *
     * @returns {Promise<string>} task_id
     */
    async faceswap({
        target_image_url,
        swap_image_url,
        webhook_url = undefined,
        webhook_secret = undefined,
    }) {
        try {
            const data = JSON.stringify({
                target_image_url,
                swap_image_url,
                webhook_url,
                webhook_secret,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/faceswap`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/fetch
     *
     * Get the result/status of a submitted task.
     *
     * @returns {Promise<object>}
     *
     */
    async fetch({ task_id }) {
        try {
            const data = JSON.stringify({
                task_id,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/fetch`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/fetch-many
     *
     * Get the results/statuses of multiple tasks using their task_id.
     *
     * @returns {Promise<[object]>}
     *
     */
    async fetch_many({ task_ids }) {
        try {
            const data = JSON.stringify({
                task_ids,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/fetch-many`,
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }

    /**
     * https://docs.apiframe.pro/api-endpoints/account
     *
     * Get details about your account: credits remaining, stats, etc..
     *
     * @returns {Promise<object>}
     *
     */
    async fetch_many() {
        try {
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.baseURL}/account`,
                headers: {
                    Authorization: this.apiKey,
                    'Content-Type': 'application/json',
                },
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
            console.log('\n[ERROR] ' + error?.response?.data?.errors?.at(0)?.msg + ' \n');
            return;
        }
    }
}

module.exports = ApiframeClient;
