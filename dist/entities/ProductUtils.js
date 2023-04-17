"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillProducts = exports.filterProducts = exports.createProducts = void 0;
const Product_1 = require("./Product");
const createProducts = (scrapedProducts) => Object.entries(scrapedProducts).reduce((products, [field, fieldValues]) => {
    fieldValues.forEach((fieldValue, productIndex) => {
        products[productIndex] = Object.assign(Object.assign({}, (products[productIndex] || {})), { [field]: fieldValue });
    });
    return products;
}, []);
exports.createProducts = createProducts;
const filterProducts = (products) => {
    const imageRegex = new RegExp("https?://(www.)?");
    return products.filter(({ image, price, title, url }) => !!image && image.match(imageRegex) && !!url && !!price && !!title);
};
exports.filterProducts = filterProducts;
const mapBuscapeUrlField = (url) => {
    const baseUrl = "https://www.buscape.com.br";
    const urlRegex = new RegExp("https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)");
    return url.match(urlRegex) ? baseUrl + url : url;
};
const fillBuscapeProducts = (product) => (Object.assign(Object.assign({}, product), { url: product.url ? mapBuscapeUrlField(product.url) : "" }));
const mapFreemarketPriceField = (price) => {
    const priceNumbers = price
        .split(" ")
        .map((label) => Number(label))
        .filter((value) => !isNaN(value));
    return priceNumbers[1]
        ? `R$${priceNumbers[0]},${priceNumbers[1]}`
        : `R$${priceNumbers[0]},00`;
};
const fillFreemarketProducts = (product) => (Object.assign(Object.assign({}, product), { price: product.price ? mapFreemarketPriceField(product.price) : "" }));
const fillProducts = (products, scrapedProductParams) => {
    const mapDomainToFillFunction = {
        [Product_1.PRODUCT_DOMAINS.BUSCAPE]: fillBuscapeProducts,
        [Product_1.PRODUCT_DOMAINS.FREEEMARKET]: fillFreemarketProducts,
    };
    return products.map((product) => (Object.assign({ category: scrapedProductParams.category, description: product.description || "", domain: scrapedProductParams.domain, image: product.image || "", price: product.price || "", title: product.title || "", url: product.url || "" }, mapDomainToFillFunction[scrapedProductParams.domain](product))));
};
exports.fillProducts = fillProducts;
