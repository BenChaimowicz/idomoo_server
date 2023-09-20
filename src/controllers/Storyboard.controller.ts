import { Inject, Service } from "typedi";
import { StoryboardService } from "../services/Storyboard.service";
import { NextFunction, Request, Response } from "express";
import { GenerateVideoDataElement, GenerateVideoRequest } from "../types/types";
import { ErrorService } from "../services/Error.service";
import { VideoService } from "../services/Video.service";

@Service()
export class StoryBoardController {

    constructor(
        @Inject() private storyboardService: StoryboardService,
        @Inject() private errorService: ErrorService,
        @Inject() private videoService: VideoService
    ) { }

    public async getStoryboard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const nid = id ? Number(id) : undefined;
            const storyboard = await this.storyboardService.getStoryboard(nid);
            res.send(storyboard);
        } catch (error) {
            res.status(500).send(error);
            this.errorService.logAxiosErrorMessage(error);
        }
    }

    public async generateVideoFromStoryboard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { storyboard_id, data, output } = req.body as GenerateVideoRequest;
            const videoElements: GenerateVideoDataElement[] = data ? data : [{ key: 'Text1', val: 'Test' }, { key: 'Media1', val: 'rgb(255,255,0' }];
            const video = await this.storyboardService.generateFromStoryboard(storyboard_id, output, ...videoElements);
            res.send(video);
        } catch (error) {
            res.status(500).send(error);
            this.errorService.logAxiosErrorMessage(error);
        }
    }

    public async checkVideoStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { link } = req.query;
            if (!link) {
                res.status(400).send('Missing link');
                return;
            }
            const statusCheck = await this.videoService.checkStatus(link as string);
            res.send(statusCheck);
        } catch (error) {
            res.status(500).send(error);
            this.errorService.logAxiosErrorMessage(error);
        }
    }
}