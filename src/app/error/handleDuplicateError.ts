import {  TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: err.message,
    errorMessages,
  };
};

export default handleDuplicateError;