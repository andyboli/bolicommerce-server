"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDatabaseProducts = exports.mapScrapedProducts = exports.mapFreemarketProductsCategories = exports.mapBuscapeProductsCategories = exports.PRODUCT_FIELDS = exports.PRODUCT_CATEGORIES = exports.PRODUCT_DOMAINS = void 0;
const ProductUtils_1 = require("./ProductUtils");
var PRODUCT_DOMAINS;
(function (PRODUCT_DOMAINS) {
    PRODUCT_DOMAINS["ALL"] = "all";
    PRODUCT_DOMAINS["BUSCAPE"] = "buscape";
    PRODUCT_DOMAINS["FREEEMARKET"] = "freemarket";
})(PRODUCT_DOMAINS = exports.PRODUCT_DOMAINS || (exports.PRODUCT_DOMAINS = {}));
var PRODUCT_CATEGORIES;
(function (PRODUCT_CATEGORIES) {
    PRODUCT_CATEGORIES["MOBILE"] = "mobile";
    PRODUCT_CATEGORIES["REFRIGERATOR"] = "refrigerator";
    PRODUCT_CATEGORIES["TV"] = "tv";
})(PRODUCT_CATEGORIES = exports.PRODUCT_CATEGORIES || (exports.PRODUCT_CATEGORIES = {}));
var PRODUCT_FIELDS;
(function (PRODUCT_FIELDS) {
    PRODUCT_FIELDS["CATEGORY"] = "category";
    PRODUCT_FIELDS["DESCRIPTION"] = "description";
    PRODUCT_FIELDS["DOMAIN"] = "domain";
    PRODUCT_FIELDS["IMAGE"] = "image";
    PRODUCT_FIELDS["PRICE"] = "price";
    PRODUCT_FIELDS["TITLE"] = "title";
    PRODUCT_FIELDS["URL"] = "url";
})(PRODUCT_FIELDS = exports.PRODUCT_FIELDS || (exports.PRODUCT_FIELDS = {}));
exports.mapBuscapeProductsCategories = {
    [PRODUCT_CATEGORIES.MOBILE]: "celular",
    [PRODUCT_CATEGORIES.REFRIGERATOR]: "geladeira",
    [PRODUCT_CATEGORIES.TV]: "tv",
};
exports.mapFreemarketProductsCategories = {
    [PRODUCT_CATEGORIES.MOBILE]: "celulares-telefones",
    [PRODUCT_CATEGORIES.REFRIGERATOR]: "geladeiras-freezers",
    [PRODUCT_CATEGORIES.TV]: "eletronicos-audio-video/televisores",
};
const mapScrapedProducts = (scrapedProducts, scrapedProductParams) => (0, ProductUtils_1.fillProducts)((0, ProductUtils_1.filterProducts)((0, ProductUtils_1.createProducts)(scrapedProducts)), scrapedProductParams);
exports.mapScrapedProducts = mapScrapedProducts;
const mapDatabaseProducts = (products) => products.reduce((acc, product) => {
    if (product.domain === PRODUCT_DOMAINS.BUSCAPE)
        return Object.assign(Object.assign({}, acc), { [PRODUCT_DOMAINS.BUSCAPE]: [...acc[PRODUCT_DOMAINS.BUSCAPE], product] });
    if (product.domain === PRODUCT_DOMAINS.FREEEMARKET)
        return Object.assign(Object.assign({}, acc), { [PRODUCT_DOMAINS.FREEEMARKET]: [
                ...acc[PRODUCT_DOMAINS.FREEEMARKET],
                product,
            ] });
    return acc;
}, {
    [PRODUCT_DOMAINS.BUSCAPE]: [],
    [PRODUCT_DOMAINS.FREEEMARKET]: [],
});
exports.mapDatabaseProducts = mapDatabaseProducts;
