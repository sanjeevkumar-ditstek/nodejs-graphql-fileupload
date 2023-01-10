import {
    IRequest,
    IResponse,
} from '../utils/interfaces/common';

export interface IFileUploadServiceAPI {
    uploadFiles(request: IUploadFileRequest): Promise<IUploadFileResponse>
}

/********************************************************************************
*  Create Test
********************************************************************************/

export interface IUploadFileRequest extends IRequest {
    files: any;
    req : any;
}

export interface IUploadFileResponse extends IResponse {
    url?: string;
    error?: any;
}


