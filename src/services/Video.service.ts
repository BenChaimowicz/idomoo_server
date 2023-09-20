import { Inject, Service } from "typedi";
import { ErrorService } from "./Error.service";
import { CheckStatusResponse } from "../types/types";
import axios from "axios";
import { AuthService } from "./Auth.service";


@Service()
export class VideoService {
    constructor(
        @Inject() private errorService: ErrorService,
        @Inject() private authService: AuthService
    ) { }

    public async checkStatus(link: string): Promise<CheckStatusResponse | undefined> {
        try {
            const { data } = await axios.get<CheckStatusResponse>(link, { headers: { Authorization: await this.authService.getAuthHeader() } });
            return data;
        } catch (error) {
            throw error;
        }
    }


}