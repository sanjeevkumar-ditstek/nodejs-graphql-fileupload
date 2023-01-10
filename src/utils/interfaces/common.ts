export interface IError{
    message: string;
}

export interface IRequest {}

export interface IResponse {
  status: number;
  error?: IError;
}