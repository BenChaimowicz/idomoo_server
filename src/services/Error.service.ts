import { AxiosError } from "axios";
import { Service } from "typedi";
import { ErrorResponse, IdomooError } from "../types/types";

@Service()
export class ErrorService {

    constructor(
    ) { }

    public logAxiosErrorMessage(error: unknown) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message, axiosError.cause, axiosError.response?.data);
    }

    public checkErrorCode(error: any, ...codes: number[]): boolean {
        if (error.errors) {
            for (const err of error.errors) {
                if (codes.includes(err.error_code)) return true;
            }
        }
        return false;
    }
}
