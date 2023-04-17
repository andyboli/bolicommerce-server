"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCTS_ENDPOINT = void 0;
const express_1 = __importDefault(require("express"));
const express_rescue_1 = __importDefault(require("express-rescue"));
const controllers_1 = require("../../controllers");
const ProductsRouter = express_1.default.Router();
ProductsRouter.post("/", (0, express_rescue_1.default)(controllers_1.ProductsController.postProducts));
ProductsRouter.delete("/", (0, express_rescue_1.default)(controllers_1.ProductsController.deleteProducts));
exports.PRODUCTS_ENDPOINT = "/products";
exports.default = ProductsRouter;
