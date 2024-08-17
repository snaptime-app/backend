import { Router, Request, Response } from "express";
import ImageService from "../services/imageService";

class RootRoutes {
    router = Router();
    imageService: ImageService;

    constructor() {
        this.intializeRoutes();
        this.imageService = new ImageService();
    }

    intializeRoutes() {
        this.router.post("/areSimilar", async (req: Request, res: Response): Promise<Response> => {
            const isSimilar: boolean = await this.imageService.determineImagesSimilar(
                req.body.imageUrlA,
                req.body.imageUrlB,
            );
            return res.status(200).json({ isSimilar: isSimilar });
        });
    }
}

export default new RootRoutes().router;
