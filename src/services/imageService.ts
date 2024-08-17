import { openai } from "../util/openAI";
import { ImageSimilarResult } from "../types";

class ImageService {
    async determineImagesSimilar(
        imageUrlA: string,
        imageUrlB: string,
        prompt?: string,
    ): Promise<boolean> {
        return await this.determineImagesSimilarOpenAI(imageUrlA, imageUrlB, prompt);
    }

    async determineImagesSimilarOpenAI(
        imageUrlA: string,
        imageUrlB: string,
        prompt?: string,
    ): Promise<boolean> {
        if (!process.env.OPENAI_MODEL_NAME) {
            throw new Error("Please specify OPENAI_MODEL_NAME in the environment file.")
        }
        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: (prompt || "Determine if these two images are of the same object. Report the result as a JSON object."),
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrlA,
                            },
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrlB,
                            },
                        },
                    ],
                },
            ],
            model: process.env.OPENAI_MODEL_NAME,
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "image-similarity",
                    description: "Result describing whether the images are similar or not",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            isSimilar: { type: "boolean" },
                        },
                        required: ["isSimilar"],
                        additionalProperties: false,
                    },
                },
            },
            max_tokens: 10,
        });
        if (response.choices.length <= 0) {
            throw new Error("There was no result returned by OpenAI");
        }
        const result = response.choices[0].message.content;
        console.log("OpenAI Response:", result);
        if (!result) {
            throw new Error("There was no result returned by OpenAI");
        }
        const resultObj: ImageSimilarResult = JSON.parse(result);
        return resultObj.isSimilar;
    }
}

export default ImageService;
