import { ApolloError } from "apollo-server-express";
import StatusCodeEnum from "./enums/StatusCodeEnum";


export const Response = {
    checkStatus: (response: any) => {
        if (response.status === StatusCodeEnum.OK) return;
        // if (response.status === StatusCodeEnum.NOT_FOUND) return;
        throw new ApolloError(
            response.error,
            response.status.toString(),
            { errors: response?.error?.details || [] }
        );
    },
    catchThrow: (err: any) => {
        console.log(err);
        throw err;
    },
};