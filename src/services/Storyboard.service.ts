import { Inject, Service } from "typedi";
import axios from "axios";
import { AuthService } from "./Auth.service";
import { GenerateVideoDataElement, GenerateVideoRequest, StoryboardResponse } from "../types/types";

@Service()
export class StoryboardService {
    constructor(
        @Inject() private authService: AuthService
    ) { }

    public async getStoryboard(id: number = process.env.STORYBOARD_ID as unknown as number): Promise<StoryboardResponse> {
        try {
            const URL = `${process.env.API_URL}/storyboards/${id}`;
            const { data } = await axios.get<StoryboardResponse>(URL, { headers: { Authorization: await this.authService.getAuthHeader() } });
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async generateFromStoryboard(id: number, ...dataElements: GenerateVideoDataElement[]): Promise<unknown> {
        try {
            const URL = `${process.env.API_URL}/storyboards/generate`;
            const body: GenerateVideoRequest = { storyboard_id: id, data: dataElements, output: { video: [{ format: 'webm', height: 100, overlays: [] }] } };
            const { data } = await axios.post(URL, body, { headers: { Authorization: await this.authService.getAuthHeader() } });
            console.log(data);

            return data;
        } catch (error) {
            throw error;
        }
    }
}