import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?:string
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    const responseObject: any = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
      };
    
      // Check if there is a token and add it to the response object if present

      if (data?.token) {
        responseObject.token = data?.token;
      }
    
      res.status(data?.statusCode).json(responseObject);
      

    }

export default sendResponse;