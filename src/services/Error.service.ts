import { AxiosError } from "axios";
import { Service } from "typedi";

@Service()
export class ErrorService {

    public logAxiosErrorMessage(error: unknown) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message, axiosError.cause, axiosError.response?.data);
    }
}