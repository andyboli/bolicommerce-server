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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const database_1 = require("../database");
const services_1 = require("../services");
const deleteProducts = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.ProductsQueries.dropProducts();
        return response.status(200);
    }
    catch (err) {
        return boom_1.default.badImplementation(`Error on deleteProducts\n${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
    }
});
const postProducts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.body.data, { stored } = _a, scrapeParams = __rest(_a, ["stored"]);
    try {
        if (!stored) {
            const products = yield services_1.PuppeteerService.scrapeProducts(scrapeParams);
            yield database_1.ProductsQueries.saveProducts(products);
            return response.status(200).json({ products, stored: true });
        }
        else {
            const products = yield database_1.ProductsQueries.findProducts(scrapeParams);
            return response.status(200).json({ products, stored: true });
        }
    }
    catch (err) {
        return boom_1.default.badImplementation(`Error on postProducts\n${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
    }
});
const ProductsController = {
    deleteProducts,
    postProducts,
};
exports.default = ProductsController;
