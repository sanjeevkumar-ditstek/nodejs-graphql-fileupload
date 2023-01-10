import {
  ApolloError
} from 'apollo-server-express';
import proxy from '../../services/appServiceProxy';
import StatusCodeEnum from "../../utils/enums/StatusCodeEnum";
import * as IFileUploadService from "../../services/IFileUploadService";
import { Response } from '../../utils/ResponseCheck';
const FileUploadResolver = {
  Query: {
    uploads() { //
    }
  },
  Mutation: {

    async uploadFiles(parent: any, args: any, context: any) {
      const { req } = context;
      const request: IFileUploadService.IUploadFileRequest = {
        files: args.params.files,
        req: req
      }
      let response: IFileUploadService.IUploadFileResponse;
      try {
        response = await proxy.fileUpload.uploadFiles(request);
        Response.checkStatus(response)
      } catch (e) {
        Response.catchThrow(e)
      }
      return response;
    },


  },
};

export default FileUploadResolver;