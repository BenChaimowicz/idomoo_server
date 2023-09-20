import { Inject, Service } from "typedi";
import axios from "axios";
import { DateTime } from 'luxon';
import { O2AuthResponse } from "../types/types";
import { ErrorService } from "./Error.service";

@Service()
export class AuthService {

    constructor(
        @Inject() private errorService: ErrorService
    ) { }

    private validToken?: O2AuthResponse;
    private tokenTime?: DateTime;

    public async getToken(): Promise<O2AuthResponse | undefined> {
        try {
            const URL = `${process.env.API_URL}${process.env.TOKEN_URL}`;
            const authBasic = `${process.env.ENCODED_KEY}`;
            const { data } = (await axios.post<O2AuthResponse>(URL, { grant_type: 'client_credentials' }, { headers: { 'Authorization': `Basic ${authBasic}` } }));
            if (data.access_token) this.tokenTime = DateTime.now();
            return data;
        } catch (error) {
            this.errorService.logAxiosErrorMessage(error);
            if (this.errorService.checkErrorCode(error, 1000, 1003)) {
                this.resetToken();
            }
            return;
        }
    }

    public async getAuthHeader(): Promise<string> {
        if (!this.tokenTime || (this.tokenTime && this.tokenTime.diffNow('minutes').minutes <= -30)) {
            this.validToken = await this.getToken();
        }

        return `Bearer ${this.validToken!.access_token}`;
    }

    public resetToken() {
        this.validToken = undefined;
    }
}