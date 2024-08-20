import { Router, Request, Response } from "express";
import ImageService from "../services/imageService";
import { upload } from "../util/imageUpload";
import { rateLimiter } from "../util/rateLimit";

class ImageRoutes {
    router = Router();
    imageService: ImageService;

    constructor() {
        this.intializeRoutes();
        this.imageService = new ImageService();
    }

    intializeRoutes() {
        this.router.post(
            "/upload",
            upload.single("imageUpload"),
            async (req: Request, res: Response): Promise<Response> => {
                if (!req.file) {
                    throw new Error("No file uploaded");
                }
                return res.status(201).json({
                    key: req.file.path,
                });
            }
        );

        this.router.post(
            "/areSimilar",
            rateLimiter,
            async (req: Request, res: Response): Promise<Response> => {
                const isSimilar: boolean = await this.imageService.determineImagesSimilar(
                    req.body.imageUrlA,
                    req.body.imageUrlB,
                );
                return res.status(200).json({ isSimilar: isSimilar });
            }
        );
    }
}

export default new ImageRoutes().router;
