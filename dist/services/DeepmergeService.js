"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = __importDefault(require("deepmerge"));
const mergePagesFields = (fields, pageFields) => {
    if (pageFields)
        return (0, deepmerge_1.default)(fields, pageFields);
    return fields;
};
const DeepmergeService = {
    mergePagesFields,
};
exports.default = DeepmergeService;
