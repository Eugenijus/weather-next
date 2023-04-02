import { validationResult } from 'express-validator';

export const errorHandler = (error, request, response) => {
  // Error handling middleware functionality
  console.error(`[${new Date().toJSON()}] ERROR-HANDLER ::: ${error.message}`);
  const status = error.status || 400;

  // send back an easily understandable error message to the caller
  response.status(status).send(error.message);
};

export const customizeErrorMessage = (req, customError) => {
  const validationErrors = validationResult(req);
  console.log("validationErrors: ", validationErrors);
  if (!validationErrors.isEmpty()) {
    const validationError = validationErrors.errors.map((error) => {
      return error.msg + ": " + error.param;
    });
    throw new Error(validationError + ". " + customError);
  }
};

// export default errorHandler = {
//   errorHandler,
//   customizeErrorMessage,
// };
