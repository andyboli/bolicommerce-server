"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const boom_1 = __importDefault(require("@hapi/boom"));
const Product_1 = require("../../entities/Product");
const models_1 = __importDefault(require("../models"));
const ProductModel = models_1.default.products;
const findProducts = ({ category, domain, searchValue, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel.findAll({
            where: {
                category: category,
                domain: {
                    [sequelize_1.Op.or]: domain === Product_1.PRODUCT_DOMAINS.ALL
                        ? [Product_1.PRODUCT_DOMAINS.BUSCAPE, Product_1.PRODUCT_DOMAINS.FREEEMARKET]
                        : [domain],
                },
                title: { [sequelize_1.Op.substring]: searchValue },
            },
        });
        return (0, Product_1.mapDatabaseProducts)(products.map((product) => product.toJSON()));
    }
    catch (err) {
        return boom_1.default.badImplementation(`Database error - findProducts\n${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
    }
});
const saveProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return ProductModel.create(product);
    }
    catch (err) {
        return boom_1.default.badImplementation(`Database error - saveProduct\n${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
    }
});
const saveProducts = (products) => Promise.all([...products.buscape, ...products.freemarket].map((product) => saveProduct(product)));
const dropProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return ProductModel.drop();
    }
    catch (err) {
        return boom_1.default.badImplementation(`Database error - dropProducts\n${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
    }
});
const ProductsQueries = {
    dropProducts,
    findProducts,
    saveProducts,
};
exports.default = ProductsQueries;
