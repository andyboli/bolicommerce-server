import { Page } from "puppeteer";

import { DeepmergeService, DotenvService } from "./";
import {
  mapBuscapeProductsCategories,
  mapFreemarketProductsCategories,
  mapScrapedProducts,
  Product,
  PRODUCT_CATEGORIES,
  PRODUCT_FIELDS,
  ScrapedProductParams,
  ScrapedProducts,
  ScrapedProductSelector,
  ScrapedProductSelectors,
} from "../entities/Product";

const nextPageLoad = async (
  page: Page,
  paginationComponentSelector: string
) => {
  await page.click(paginationComponentSelector);
  await page.waitForSelector(paginationComponentSelector);
};

const gotoBuscapeDomain = async (
  page: Page,
  { category, searchValue }: Omit<ScrapedProductParams, "domain">
) => {
  const buscapeDomain = `https://www.buscape.com.br/busca/${mapBuscapeProductsCategories[category]}+${searchValue}`;
  await page.goto(buscapeDomain, { waitUntil: "load" });
};

const gotoFreemarketDomain = async (
  page: Page,
  { category, searchValue }: Omit<ScrapedProductParams, "domain">
) => {
  const freemarketDomain = `https://lista.mercadolivre.com.br/${mapFreemarketProductsCategories[category]}/${searchValue}_NoIndex_True`;
  await page.goto(freemarketDomain, { waitUntil: "load" });
};

const getBuscapePaginationLimit = async (page: Page, firstPage: number) => {
  const paginationLimit = await page.evaluate(() => {
    const buscapePaginationComponentSelector = ".Paginator_page__50dus";
    const buscapePaginationComponents = document.querySelectorAll(
      buscapePaginationComponentSelector
    );
    const buscapePaginationComponentsIndexes = Array.from(
      buscapePaginationComponents,
      (element: Element) => element.children[0].innerHTML
    );
    const minPaginationLenght = 3;
    const buscapePaginationComponentLastPageIndex = -2;
    if (buscapePaginationComponentsIndexes.length < minPaginationLenght) return;
    return Number(
      buscapePaginationComponentsIndexes.splice(
        buscapePaginationComponentLastPageIndex
      )[0]
    );
  });
  return paginationLimit || firstPage;
};

const getFreemarketPaginationLimit = async (page: Page, firstPage: number) => {
  const paginationLabel = await page.evaluate(() => {
    const freemarketPaginationComponentLabelSelector =
      ".andes-pagination__page-count";
    return document.querySelector(freemarketPaginationComponentLabelSelector)
      ?.innerHTML;
  });
  const paginationLimit = paginationLabel
    ? Number(paginationLabel.slice(-2))
    : firstPage;
  return paginationLimit;
};

const getBuscapeScrapedProducts = async (
  page: Page
): Promise<ScrapedProducts> =>
  page.evaluate(() => {
    const descriptionFieldQuerySelector =
      ".Text_Text__h_AF6.Text_MobileLabelXs__ER_cD.Text_MobileLabelSAtLarge__YdYbv.SearchCard_ProductCard_BestMerchant__f4t5p";
    const imageFieldQuerySelector = ".SearchCard_ProductCard_Image__ffKkn";
    const priceFieldQuerySelector =
      ".Text_Text__h_AF6.Text_MobileHeadingS__Zxam2";
    const titleFieldQuerySelector =
      ".Text_Text__h_AF6.Text_MobileLabelXs__ER_cD.Text_DesktopLabelSAtLarge__baj_g.SearchCard_ProductCard_Name__ZaO5o";
    const urlFieldQuerySelector = ".SearchCard_ProductCard_Inner__7JhKb";
    const buscapeSelectors: ScrapedProductSelectors = {
      description: {
        querySelector: descriptionFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      image: {
        querySelector: imageFieldQuerySelector,
        getData: (element: Element) =>
          element?.children[0]?.children[0]?.getAttribute("src") || "",
      },
      price: {
        querySelector: priceFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      title: {
        querySelector: titleFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      url: {
        querySelector: urlFieldQuerySelector,
        getData: (element: Element) => element?.getAttribute("href") || "",
      },
    };
    const getFieldsData = (
      fields: Partial<ScrapedProducts>,
      [field, fieldSelector]: [string, ScrapedProductSelector]
    ): Partial<ScrapedProducts> => ({
      ...fields,
      [field]:
        fieldSelector.querySelector &&
        Array.from(
          document.querySelectorAll(fieldSelector.querySelector),
          fieldSelector.getData
        ),
    });
    return Object.entries(buscapeSelectors).reduce(
      getFieldsData,
      {}
    ) as ScrapedProducts;
  });

const getFreemarkScrapedProducts = async (
  page: Page
): Promise<ScrapedProducts> =>
  page.evaluate(() => {
    const descriptionFieldQuerySelector =
      ".ui-search-item__group__element.ui-search-item__variations-text.shops__items-group-details";
    const imageFieldQuerySelector =
      ".ui-search-result-image__element.shops__image-element";
    const priceFieldQuerySelector = ".price-tag-text-sr-only";
    const titleFieldQuerySelector = ".ui-search-item__title.shops__item-title";
    const urlFieldQuerySelector =
      ".ui-search-item__group__element.shops__items-group-details.ui-search-link";
    const freemarketSelectors: ScrapedProductSelectors = {
      description: {
        querySelector: descriptionFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      image: {
        querySelector: imageFieldQuerySelector,
        getData: (element: Element) => element?.getAttribute("src") || "",
      },
      price: {
        querySelector: priceFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      title: {
        querySelector: titleFieldQuerySelector,
        getData: (element: Element) => element?.innerHTML || "",
      },
      url: {
        querySelector: urlFieldQuerySelector,
        getData: (element: Element) => element.getAttribute("href") || "",
      },
    };
    const getFieldsData = (
      fields: Partial<ScrapedProducts>,
      [field, fieldSelector]: [string, ScrapedProductSelector]
    ) => ({
      ...fields,
      [field]:
        fieldSelector.querySelector &&
        Array.from(
          document.querySelectorAll(fieldSelector.querySelector),
          fieldSelector.getData
        ),
    });
    return Object.entries(freemarketSelectors).reduce(
      getFieldsData,
      {}
    ) as ScrapedProducts;
  });

export const getBuscapeProducts = async (
  page: Page,
  scrapeParams: ScrapedProductParams
) => {
  await gotoBuscapeDomain(page, scrapeParams);
  const buscapePagesChainLoad = [];
  const buscapeFirstPage = 1;
  // navigate to firstPage
  buscapePagesChainLoad.push(getBuscapeScrapedProducts(page));
  // navigate to otherPages
  // due request timeout vercel limitation the pagination should be enabled only in development mode [https://vercel.com/docs/concepts/limits/overview]
  if (DotenvService.getEnv("NODE_ENV") === "development") {
    const paginationLimit = await getBuscapePaginationLimit(
      page,
      buscapeFirstPage
    );
    const buscapePaginationComponentNextPageSelector =
      ".Paginator_page__50dus.Paginator_fullPage__5DTfi > .Paginator_pageLink__GsWrn";
    for (
      let navigations = buscapeFirstPage;
      navigations < paginationLimit;
      navigations++
    ) {
      buscapePagesChainLoad.push(
        nextPageLoad(page, buscapePaginationComponentNextPageSelector)
      );
      buscapePagesChainLoad.push(getBuscapeScrapedProducts(page));
    }
  }
  const buscapePagesChainLoaded = await Promise.all(buscapePagesChainLoad);
  const buscapeScrapeProducts = buscapePagesChainLoaded.reduce(
    DeepmergeService.mergePagesFields,
    {}
  ) as ScrapedProducts;
  return mapScrapedProducts(buscapeScrapeProducts, {
    category: scrapeParams.category,
    domain: scrapeParams.domain,
  });
};

export const getFreemarketProducts = async (
  page: Page,
  scrapeParams: ScrapedProductParams
) => {
  await gotoFreemarketDomain(page, scrapeParams);
  const freemarketPagesChainLoad = [];
  // navigate to firstPage
  freemarketPagesChainLoad.push(getFreemarkScrapedProducts(page));
  const freemarketPaginationComponentNextPageSelector =
    ".andes-pagination__link.shops__pagination-link.ui-search-link";
  // navigate to otherPages
  // due request timeout vercel limitation the pagination should be enabled only in development mode [https://vercel.com/docs/concepts/limits/overview]
  if (DotenvService.getEnv("NODE_ENV") === "development") {
    const freemarketFirstPage = 1;
    const paginationLimit = await getFreemarketPaginationLimit(
      page,
      freemarketFirstPage
    );
    for (
      let navigations = freemarketFirstPage;
      navigations < paginationLimit;
      navigations++
    ) {
      freemarketPagesChainLoad.push(
        nextPageLoad(page, freemarketPaginationComponentNextPageSelector)
      );
      freemarketPagesChainLoad.push(getFreemarkScrapedProducts(page));
    }
  }
  const freemarketPagesChainLoaded = await Promise.all(
    freemarketPagesChainLoad
  );
  const freemarketProducts = freemarketPagesChainLoaded.reduce(
    DeepmergeService.mergePagesFields,
    {}
  ) as ScrapedProducts;
  return mapScrapedProducts(freemarketProducts, {
    category: scrapeParams.category,
    domain: scrapeParams.domain,
  });
};
