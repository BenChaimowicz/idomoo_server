import { Inject, Service } from "typedi";
import axios, { AxiosError } from "axios";
import { O2AuthResponse } from "../types/types";
import { ErrorService } from "./Error.service";

@Service()
export class AuthService {

    constructor(
        @Inject() private errorService: ErrorService
    ) { }

    private validToken: O2AuthResponse | undefined = undefined;

    public async getToken(): Promise<O2AuthResponse | undefined> {
        try {
            const URL = `${process.env.API_URL}${process.env.TOKEN_URL}`;
            const authBasic = `${process.env.ENCODED_KEY}`;
            const { data } = (await axios.post<O2AuthResponse>(URL, { grant_type: 'client_credentials' }, { headers: { 'Authorization': `Basic ${authBasic}` } }));
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
        if (!this.validToken || !this.validToken.access_token) this.validToken = await this.getToken();
        return `Bearer ${this.validToken!.access_token}`;
    }

    public resetToken() {
        this.validToken = undefined;
    }
}