"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const boom_1 = __importDefault(require("@hapi/boom"));
dotenv_1.default.config();
const getEnv = (envKey) => {
    const envValue = process.env[envKey];
    if (!envValue)
        return boom_1.default.badImplementation(`Environment variable ${envKey} doesn't exist`);
    return envValue;
};
const DotenvService = {
    getEnv,
};
exports.default = DotenvService;
