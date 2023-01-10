import { IAppServiceProxy } from "./appServiceProxy";
import StatusCodeEnum from "../utils/enums/StatusCodeEnum";
import * as IFileUploadService from "../services/IFileUploadService";
import fs from "fs";
import { FileUpload } from "graphql-upload-minimal";
import e from "express";

const fileRenamer = (filename: string): string => {
  const queHoraEs = Date.now();
  const regex = /[\s_-]/gi;
  const fileTemp = filename.replace(regex, ".");
  const arrTemp = [fileTemp.split(".")];
  return `${arrTemp[0]
    .slice(0, arrTemp[0].length - 1)
    .join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
};

export const checkFileSize = (stream, maxSize: number) =>
  new Promise((resolves, rejects) => {
    let filesize = 0;
    // const stream = createReadStream();
    stream.on('data', (chunk: Buffer) => {
      filesize += chunk.length;
      if (filesize > maxSize) {
        rejects("File size is too large")
      }
    });
    stream.on('end', () =>
      resolves(true)
    );
    stream.on('error', rejects);
  });


export default class FileUploadService implements IFileUploadService.IFileUploadServiceAPI {
  private proxy: IAppServiceProxy;
  constructor(proxy: IAppServiceProxy) {
    this.proxy = proxy;
  }


  public uploadFiles = async (
    request: IFileUploadService.IUploadFileRequest
  ): Promise<IFileUploadService.IUploadFileResponse> => {
    const response: IFileUploadService.IUploadFileResponse = {
      status: StatusCodeEnum.UNKNOWN_CODE,
    };
    const { files, req } = request;
    let url: string;
    const { file } = await files;
    const dir = process.cwd() + "/uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    try {
      const { createReadStream, filename, mimetype } = file;
      const newFilename = fileRenamer(filename);


      const stream = createReadStream();
      const fileValidation: any = await this.fileValidation(file);
      if (fileValidation?.errors?.length > 0) {
        console.log(fileValidation?.errors);
        response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
        response.error = fileValidation?.errors;
        return response;
      }
      // Validation for file size
      const maxFileSize = 100
      await checkFileSize(stream, maxFileSize);

      const pathName = `${dir}${newFilename}`;
      await stream.pipe(fs.createWriteStream(pathName));
      const newUrl = `${req.protocol}://${req.headers.host}/uploads/${newFilename}`;
      url = newUrl;

    } catch (e) {
      console.error(e);
      response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
      response.error = e;
      return response;
    }
    response.status = StatusCodeEnum.OK;
    response.url = url;
    return response;
  }

  public fileValidation = async (file) => {
    const response = { errors: [], status: StatusCodeEnum.UNKNOWN_CODE };
    try {
      const image = file;
      // Array of allowed files
      const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
      const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      // Get the extension of the uploaded file
      const file_extension = image.filename.slice(
        ((image.filename.lastIndexOf('.') - 1) >>> 0) + 2
      );

      // Check if the uploaded file is allowed
      if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.mimetype)) {
        response.errors.push("Invalid file extension")
      }
      if (response.errors.length > 0) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }

    return response.status = StatusCodeEnum.OK;
  }

}