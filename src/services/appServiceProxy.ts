import FileUploadService from "../services/FileUpload.service";
import * as IFileUploadService from "../services/IFileUploadService";
export interface IAppServiceProxy {
  fileUpload: IFileUploadService.IFileUploadServiceAPI;
}


class AppServiceProxy implements IAppServiceProxy{
    public fileUpload: FileUploadService;
  
    constructor() {
      this.fileUpload = new FileUploadService(this);
    }
}

export default new AppServiceProxy();  