"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleBoomError = (err, response) => {
    const { output: { payload: { statusCode, message }, }, data, } = err;
    return response
        .status(statusCode)
        .json({ error: Object.assign({ message }, (data || {})) });
};
const ErrorMiddleware = (err, _request, response, _next) => {
    if (err.isBoom)
        return handleBoomError(err, response);
    return response
        .status(500)
        .json({ error: { message: err.message, details: null } });
};
exports.default = ErrorMiddleware;
