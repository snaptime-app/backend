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
            rateLimiter(15, 100),
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
            rateLimiter(60, 3),
            async (req: Request, res: Response): Promise<Response> => {
                const isSimilar: boolean = await this.imageService.determineImagesSimilar(
                    req.body.imageUrlA,
                    req.body.imageUrlB,
                );
                return res.status(200).json({ isSimilar });
            }
        );
    }
}

export default new ImageRoutes().router;
