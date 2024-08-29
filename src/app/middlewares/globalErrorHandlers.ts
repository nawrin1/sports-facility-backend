/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import config from '../config';
import { TErrorMessages } from '../interface/error';
import AppError from '../error/AppError';
import handleZodError from '../error/handleZodError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';


const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // console.log(err.message)
  let statusCode = err.statusCode||500;
  let message = err.message || 'Something went wrong!';
  let  errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


  if(err instanceof ZodError){
    const updatedError=handleZodError(err)
    statusCode = updatedError?.statusCode;
    message = updatedError?.message;
    errorMessages = updatedError?.errorMessages;
  
   }else if (err?.code === 11000) {
    const updatedError = handleDuplicateError(err);
    statusCode = updatedError?.statusCode;
    message = updatedError?.message;
    errorMessages = updatedError?.errorMessages;
  }else if (err?.name === 'CastError') {
    const updatedError = handleCastError(err);
    statusCode = updatedError?.statusCode;
    message = updatedError?.message;
    errorMessages = updatedError?.errorMessages;
   } else if (err?.name === 'ValidationError') {
    const updatedError = handleValidationError(err);
    statusCode = updatedError?.statusCode;
    message = updatedError?.message;
    errorMessages = updatedError?.errorMessages;
   }else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }
  
  if (err.message=="You have no access to this route"){
    return res.status(statusCode).json({
        success: false,
        statusCode:statusCode,
        message,
        
    
      });
  }
  else if (err.message=="No Data Found"){
    return res.status(statusCode).json({
        success: false,
        statusCode:statusCode,
        message,
        data:[]
        
    
      });
  }

  else{
    return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,

  })}
};

export default globalErrorHandler;