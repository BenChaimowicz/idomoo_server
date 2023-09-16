import { Router } from "express";
import { StoryBoardController } from "../controllers/Storyboard.controller";
import Container from "typedi";
import { FileUploadController } from "../controllers/FileUpload.controller";
import fileUpload from "express-fileupload";



class Routes {
    router = Router();
    private storyboardController: StoryBoardController = Container.get(StoryBoardController);
    private fileUploadController: FileUploadController = Container.get(FileUploadController);
    constructor() {
        this.initUpload();
        this.initRoutes();
    }

    private initUpload() {

    }

    private initRoutes() {
        this.router.get(`/storyboard/:id`, (req, res, next) => this.storyboardController.getStoryboard(req, res, next));
        this.router.get(`/storyboard/`, (req, res, next) => this.storyboardController.getStoryboard(req, res, next));
        this.router.post(`/storyboard/generate`, (req, res, next) => this.storyboardController.generateVideoFromStoryboard(req, res, next));
        this.router.post(`/upload`, fileUpload({ debug: true }), (req, res, next) => this.fileUploadController.uploadFile(req, res, next));
    }
}

export const allRouter = new Routes().router;