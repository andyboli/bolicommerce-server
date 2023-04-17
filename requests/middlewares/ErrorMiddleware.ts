import { ErrorRequestHandler, Response } from "express";
import { Boom } from "@hapi/boom";

const handleBoomError = (err: Boom, response: Response) => {
  const {
    output: {
      payload: { statusCode, message },
    },
    data,
  } = err;

  return response
    .status(statusCode)
    .json({ error: { message, ...(data || {}) } });
};

const ErrorMiddleware: ErrorRequestHandler = (
  err,
  _request,
  response,
  _next
) => {
  if (err.isBoom) return handleBoomError(err, response);
  return response
    .status(500)
    .json({ error: { message: err.message, details: null } });
};

export default ErrorMiddleware;
