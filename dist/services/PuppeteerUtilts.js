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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreemarketProducts = exports.getBuscapeProducts = void 0;
const _1 = require("./");
const Product_1 = require("../entities/Product");
const nextPageLoad = (page, paginationComponentSelector) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.click(paginationComponentSelector);
    yield page.waitForSelector(paginationComponentSelector);
});
const gotoBuscapeDomain = (page, { category, searchValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const buscapeDomain = `https://www.buscape.com.br/busca/${Product_1.mapBuscapeProductsCategories[category]}+${searchValue}`;
    yield page.goto(buscapeDomain, { waitUntil: "load" });
});
const gotoFreemarketDomain = (page, { category, searchValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const freemarketDomain = `https://lista.mercadolivre.com.br/${Product_1.mapFreemarketProductsCategories[category]}/${searchValue}_NoIndex_True`;
    yield page.goto(freemarketDomain, { waitUntil: "load" });
});
const getBuscapePaginationLimit = (page, firstPage) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationLimit = yield page.evaluate(() => {
        const buscapePaginationComponentSelector = ".Paginator_page__50dus";
        const buscapePaginationComponents = document.querySelectorAll(buscapePaginationComponentSelector);
        const buscapePaginationComponentsIndexes = Array.from(buscapePaginationComponents, (element) => element.children[0].innerHTML);
        const minPaginationLenght = 3;
        const buscapePaginationComponentLastPageIndex = -2;
        if (buscapePaginationComponentsIndexes.length < minPaginationLenght)
            return;
        return Number(buscapePaginationComponentsIndexes.splice(buscapePaginationComponentLastPageIndex)[0]);
    });
    return paginationLimit || firstPage;
});
const getFreemarketPaginationLimit = (page, firstPage) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationLabel = yield page.evaluate(() => {
        var _a;
        const freemarketPaginationComponentLabelSelector = ".andes-pagination__page-count";
        return (_a = document.querySelector(freemarketPaginationComponentLabelSelector)) === null || _a === void 0 ? void 0 : _a.innerHTML;
    });
    const paginationLimit = paginationLabel
        ? Number(paginationLabel.slice(-2))
        : firstPage;
    return paginationLimit;
});
const getBuscapeScrapedProducts = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return page.evaluate(() => {
        const descriptionFieldQuerySelector = ".Text_Text__h_AF6.Text_MobileLabelXs__ER_cD.Text_MobileLabelSAtLarge__YdYbv.SearchCard_ProductCard_BestMerchant__f4t5p";
        const imageFieldQuerySelector = ".SearchCard_ProductCard_Image__ffKkn";
        const priceFieldQuerySelector = ".Text_Text__h_AF6.Text_MobileHeadingS__Zxam2";
        const titleFieldQuerySelector = ".Text_Text__h_AF6.Text_MobileLabelXs__ER_cD.Text_DesktopLabelSAtLarge__baj_g.SearchCard_ProductCard_Name__ZaO5o";
        const urlFieldQuerySelector = ".SearchCard_ProductCard_Inner__7JhKb";
        const buscapeSelectors = {
            description: {
                querySelector: descriptionFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            image: {
                querySelector: imageFieldQuerySelector,
                getData: (element) => { var _a, _b; return ((_b = (_a = element === null || element === void 0 ? void 0 : element.children[0]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.getAttribute("src")) || ""; },
            },
            price: {
                querySelector: priceFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            title: {
                querySelector: titleFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            url: {
                querySelector: urlFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.getAttribute("href")) || "",
            },
        };
        const getFieldsData = (fields, [field, fieldSelector]) => (Object.assign(Object.assign({}, fields), { [field]: fieldSelector.querySelector &&
                Array.from(document.querySelectorAll(fieldSelector.querySelector), fieldSelector.getData) }));
        return Object.entries(buscapeSelectors).reduce(getFieldsData, {});
    });
});
const getFreemarkScrapedProducts = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return page.evaluate(() => {
        const descriptionFieldQuerySelector = ".ui-search-item__group__element.ui-search-item__variations-text.shops__items-group-details";
        const imageFieldQuerySelector = ".ui-search-result-image__element.shops__image-element";
        const priceFieldQuerySelector = ".price-tag-text-sr-only";
        const titleFieldQuerySelector = ".ui-search-item__title.shops__item-title";
        const urlFieldQuerySelector = ".ui-search-item__group__element.shops__items-group-details.ui-search-link";
        const freemarketSelectors = {
            description: {
                querySelector: descriptionFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            image: {
                querySelector: imageFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.getAttribute("src")) || "",
            },
            price: {
                querySelector: priceFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            title: {
                querySelector: titleFieldQuerySelector,
                getData: (element) => (element === null || element === void 0 ? void 0 : element.innerHTML) || "",
            },
            url: {
                querySelector: urlFieldQuerySelector,
                getData: (element) => element.getAttribute("href") || "",
            },
        };
        const getFieldsData = (fields, [field, fieldSelector]) => (Object.assign(Object.assign({}, fields), { [field]: fieldSelector.querySelector &&
                Array.from(document.querySelectorAll(fieldSelector.querySelector), fieldSelector.getData) }));
        return Object.entries(freemarketSelectors).reduce(getFieldsData, {});
    });
});
const getBuscapeProducts = (page, scrapeParams) => __awaiter(void 0, void 0, void 0, function* () {
    yield gotoBuscapeDomain(page, scrapeParams);
    const buscapePagesChainLoad = [];
    const buscapeFirstPage = 1;
    // navigate to firstPage
    buscapePagesChainLoad.push(getBuscapeScrapedProducts(page));
    // navigate to otherPages
    // due request timeout vercel limitation the pagination should be enabled only in development mode [https://vercel.com/docs/concepts/limits/overview]
    if (_1.DotenvService.getEnv("NODE_ENV") === "development") {
        const paginationLimit = yield getBuscapePaginationLimit(page, buscapeFirstPage);
        const buscapePaginationComponentNextPageSelector = ".Paginator_page__50dus.Paginator_fullPage__5DTfi > .Paginator_pageLink__GsWrn";
        for (let navigations = buscapeFirstPage; navigations < paginationLimit; navigations++) {
            buscapePagesChainLoad.push(nextPageLoad(page, buscapePaginationComponentNextPageSelector));
            buscapePagesChainLoad.push(getBuscapeScrapedProducts(page));
        }
    }
    const buscapePagesChainLoaded = yield Promise.all(buscapePagesChainLoad);
    const buscapeScrapeProducts = buscapePagesChainLoaded.reduce(_1.DeepmergeService.mergePagesFields, {});
    return (0, Product_1.mapScrapedProducts)(buscapeScrapeProducts, {
        category: scrapeParams.category,
        domain: scrapeParams.domain,
    });
});
exports.getBuscapeProducts = getBuscapeProducts;
const getFreemarketProducts = (page, scrapeParams) => __awaiter(void 0, void 0, void 0, function* () {
    yield gotoFreemarketDomain(page, scrapeParams);
    const freemarketPagesChainLoad = [];
    // navigate to firstPage
    freemarketPagesChainLoad.push(getFreemarkScrapedProducts(page));
    const freemarketPaginationComponentNextPageSelector = ".andes-pagination__link.shops__pagination-link.ui-search-link";
    // navigate to otherPages
    // due request timeout vercel limitation the pagination should be enabled only in development mode [https://vercel.com/docs/concepts/limits/overview]
    if (_1.DotenvService.getEnv("NODE_ENV") === "development") {
        const freemarketFirstPage = 1;
        const paginationLimit = yield getFreemarketPaginationLimit(page, freemarketFirstPage);
        for (let navigations = freemarketFirstPage; navigations < paginationLimit; navigations++) {
            freemarketPagesChainLoad.push(nextPageLoad(page, freemarketPaginationComponentNextPageSelector));
            freemarketPagesChainLoad.push(getFreemarkScrapedProducts(page));
        }
    }
    const freemarketPagesChainLoaded = yield Promise.all(freemarketPagesChainLoad);
    const freemarketProducts = freemarketPagesChainLoaded.reduce(_1.DeepmergeService.mergePagesFields, {});
    return (0, Product_1.mapScrapedProducts)(freemarketProducts, {
        category: scrapeParams.category,
        domain: scrapeParams.domain,
    });
});
exports.getFreemarketProducts = getFreemarketProducts;
