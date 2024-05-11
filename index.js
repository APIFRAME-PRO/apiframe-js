const axios = require('axios').default;

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
     * Generate an image using a text prompt. This is the /imagine command on Discord.
     *
     * @param {Object} options - The options object.
     * @param {string} options.prompt - The text prompt for Midjourney AI.
     * @param {string} [options.aspect_ratio='1:1'] - Aspect ratio for the image. Default: 1:1.
     * @param {string} [options.process_mode='fast'] - Generation mode to use for the generation. Can be Fast or Turbo.
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Upscale one of the 4 generated images by the Imagine endpoint to get a single image.
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} options.index - The index of the image to upscale. Can be 1, 2, 3 or 4
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  The Upscale (Subtle) option doubles the size of your image and keeps details very similar to the original adds Upscale (Creative) adds details to the image. Of course you first need to Upscale 1x.
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the image to upscale, you get it from the /upscale-1x request.
     * @param {string} options.type - The type of upscale. Can be subtle or creative
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Upscale any image to higher resolution, this is not from Midjourney. Image must not be larger than 2048x2048.
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the image to upscale.
     * @param {string} options.type - The type of upscale. Can be 2x or 4x.
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Reroll to create new images from a previous Imagine task.
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} [options.prompt] - Prompt for re-drawing default value: original prompt from parent task
     * @param {string} [options.aspect_ratio="1:1"] - Aspect ratio for the image. Default: 1:1
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Create 4 new variations of one of the 4 generated images by the Imagine request.
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} options.index - The index of the image to create variations from. Can be 1, 2, 3, 4, "strong" or "subtle"
     * @param {string} [options.prompt] - Drawing prompt default value: prompt from the parent task
     * @param {string} [options.aspect_ratio="1:1"] - Aspect ratio for the image. Default: 1:1
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Redraw a selected area of an image. Of course you first need to Upscale 1x. (Vary Region)
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} options.mask - Base64 encoding of the image corresponding to the selected area
     * @param {string} [options.prompt] - Drawing prompt for selected areas
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  The outpaint endpoint enlarges an image's canvas beyond its original size while keeping the contents of the original image unchanged. Of course you first need to Upscale 1x. (Zoom Out)
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} options.zoom_ratio -  Can be 1, 1.5, 2 or  (1, 2]
     * @param {string} [options.aspect_ratio="1:1"] - Aspect ratio for the image. Default: 1:1
     * @param {string} [options.prompt] - Drawing prompt for new areas
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Broadens the image canvas in a specific direction, keeping the original content intact and using prompts and the original image as guides for filling the expanded area. You first need to Upscale 1x
     *
     * @param {Object} options - The options object.
     * @param {string} options.parent_task_id - The task ID of the original task
     * @param {string} options.direction -  Image expansion direction. Can be: up, down, left or right
     * @param {string} [options.prompt] - Drawing prompt for new areas
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Writes four example prompts based on an image you upload. This is the same as using the /describe command in Discord.
     *
     * @param {Object} options - The options object.
     * @param {string} options.image_url - The URL of the image you want to describe. Should be accessible on Internet.
     * @param {string} [options.process_mode='fast'] - Generation mode to use for the generation. Can be Fast or Turbo.
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Blend multiple images into one image.
     *
     * @param {Object} options - The options object.
     * @param {[string]} options.image_urls - The URLs of the images to blend. Min 2, max 5
     * @param {string} [options.process_mode='fast'] - Generation mode to use for the generation. Can be Fast or Turbo.
     * @param {string} [options.dimension='square'] - Can be square, portrait or landscape. square by Default.
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Get the seed of a generated image.
     *
     * @param {Object} options - The options object.
     * @param {string} options.task_id - The task_id of the task
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     *  Swap the face on a target image with the face on a provided image. Each image must contain only one face.
     *
     * @param {Object} options - The options object.
     * @param {string} options.target_image_url - The URL of the image where the face will be swapped
     * @param {string} options.swap_image_url - The url of the image where the new face should be taken from.
     * @param {string} [options.webhook_url] - The final result of this task will be posted at this URL.
     * @param {string} [options.webhook_secret] - Will be passed as x-webhook-secret in the webhook call headers for authentication.
     *
     * @returns {Promise<{task_id, errors: [{msg: string}]}>}
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
     * Get the result/status of a submitted task.
     *
     * @param {Object} options - The options object.
     * @param {string} options.task_id - The task_id of the task
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
     * Get the results/statuses of multiple tasks using their task_id.
     * 
     * @param {Object} options - The options object.
     * @param {[string]} options.task_ids - The task id of the tasks, min 2 and max 20
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
     * Get details about your account: credits remaining, stats, etc..
     *
     * @returns {Promise<{email: string, credits: number, plan: string, next_billing_date: string|null, total_images: number}>}
     *
     */
    async account() {
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
