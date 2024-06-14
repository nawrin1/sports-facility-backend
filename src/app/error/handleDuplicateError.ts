import {  TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
//   // Extract value within double quotes using regex
//   const match = err.message.match(/"([^"]*)"/);

//   // The extracted value will be in the first capturing group
//   const extractedMessage = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: err.message,
    errorMessages,
  };
};

export default handleDuplicateError;