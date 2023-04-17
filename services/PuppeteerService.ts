import puppeteer from "puppeteer";

import {
  PRODUCT_DOMAINS,
  DomainsProducs,
  ScrapedProductsParams,
} from "../entities/Product";
import { getBuscapeProducts, getFreemarketProducts } from "./PuppeteerUtilts";

const scrapeProducts = async ({
  domain,
  ...scrapeParams
}: ScrapedProductsParams) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const domainsProducts: DomainsProducs = {
    [PRODUCT_DOMAINS.BUSCAPE]: [],
    [PRODUCT_DOMAINS.FREEEMARKET]: [],
  };
  if (domain === PRODUCT_DOMAINS.BUSCAPE) {
    const buscapeProducts = await getBuscapeProducts(page, {
      domain,
      ...scrapeParams,
    });
    domainsProducts[PRODUCT_DOMAINS.BUSCAPE] = buscapeProducts;
  }
  if (domain === PRODUCT_DOMAINS.FREEEMARKET) {
    const freemarketProducts = await getFreemarketProducts(page, {
      domain,
      ...scrapeParams,
    });
    domainsProducts[PRODUCT_DOMAINS.FREEEMARKET] = freemarketProducts;
  }
  if (domain === PRODUCT_DOMAINS.ALL) {
    const buscapeProducts = await getBuscapeProducts(page, {
      domain: PRODUCT_DOMAINS.BUSCAPE,
      ...scrapeParams,
    });
    const freemarketProducts = await getFreemarketProducts(page, {
      domain: PRODUCT_DOMAINS.FREEEMARKET,
      ...scrapeParams,
    });
    domainsProducts[PRODUCT_DOMAINS.BUSCAPE] = buscapeProducts;
    domainsProducts[PRODUCT_DOMAINS.FREEEMARKET] = freemarketProducts;
  }
  await browser.close();
  return domainsProducts;
};

const PuppeteerService = {
  scrapeProducts,
};

export default PuppeteerService;
