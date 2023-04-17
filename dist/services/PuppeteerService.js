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
const puppeteer_1 = __importDefault(require("puppeteer"));
const Product_1 = require("../entities/Product");
const PuppeteerUtilts_1 = require("./PuppeteerUtilts");
const scrapeProducts = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { domain } = _a, scrapeParams = __rest(_a, ["domain"]);
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    const domainsProducts = {
        [Product_1.PRODUCT_DOMAINS.BUSCAPE]: [],
        [Product_1.PRODUCT_DOMAINS.FREEEMARKET]: [],
    };
    if (domain === Product_1.PRODUCT_DOMAINS.BUSCAPE) {
        const buscapeProducts = yield (0, PuppeteerUtilts_1.getBuscapeProducts)(page, Object.assign({ domain }, scrapeParams));
        domainsProducts[Product_1.PRODUCT_DOMAINS.BUSCAPE] = buscapeProducts;
    }
    if (domain === Product_1.PRODUCT_DOMAINS.FREEEMARKET) {
        const freemarketProducts = yield (0, PuppeteerUtilts_1.getFreemarketProducts)(page, Object.assign({ domain }, scrapeParams));
        domainsProducts[Product_1.PRODUCT_DOMAINS.FREEEMARKET] = freemarketProducts;
    }
    if (domain === Product_1.PRODUCT_DOMAINS.ALL) {
        const buscapeProducts = yield (0, PuppeteerUtilts_1.getBuscapeProducts)(page, Object.assign({ domain: Product_1.PRODUCT_DOMAINS.BUSCAPE }, scrapeParams));
        const freemarketProducts = yield (0, PuppeteerUtilts_1.getFreemarketProducts)(page, Object.assign({ domain: Product_1.PRODUCT_DOMAINS.FREEEMARKET }, scrapeParams));
        domainsProducts[Product_1.PRODUCT_DOMAINS.BUSCAPE] = buscapeProducts;
        domainsProducts[Product_1.PRODUCT_DOMAINS.FREEEMARKET] = freemarketProducts;
    }
    yield browser.close();
    return domainsProducts;
});
const PuppeteerService = {
    scrapeProducts,
};
exports.default = PuppeteerService;
