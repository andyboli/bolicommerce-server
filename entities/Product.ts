import { createProducts, filterProducts, fillProducts } from "./ProductUtils";

export enum PRODUCT_DOMAINS {
  ALL = "all",
  BUSCAPE = "buscape",
  FREEEMARKET = "freemarket",
}

export enum PRODUCT_CATEGORIES {
  MOBILE = "mobile",
  REFRIGERATOR = "refrigerator",
  TV = "tv",
}

export enum PRODUCT_FIELDS {
  CATEGORY = "category",
  DESCRIPTION = "description",
  DOMAIN = "domain",
  IMAGE = "image",
  PRICE = "price",
  TITLE = "title",
  URL = "url",
}

export interface Product {
  [PRODUCT_FIELDS.CATEGORY]: string;
  [PRODUCT_FIELDS.DESCRIPTION]: string;
  [PRODUCT_FIELDS.DOMAIN]: Omit<PRODUCT_DOMAINS, PRODUCT_DOMAINS.ALL>;
  [PRODUCT_FIELDS.IMAGE]: string;
  [PRODUCT_FIELDS.PRICE]: string;
  [PRODUCT_FIELDS.TITLE]: string;
  [PRODUCT_FIELDS.URL]: string;
}

export interface ScrapedProducts {
  [PRODUCT_FIELDS.DESCRIPTION]: string[];
  [PRODUCT_FIELDS.IMAGE]: string[];
  [PRODUCT_FIELDS.PRICE]: string[];
  [PRODUCT_FIELDS.TITLE]: string[];
  [PRODUCT_FIELDS.URL]: string[];
}

export interface ScrapedProductSelector {
  getData: (element: Element) => string;
  querySelector: string;
}

export interface ScrapedProductSelectors {
  [PRODUCT_FIELDS.DESCRIPTION]: ScrapedProductSelector;
  [PRODUCT_FIELDS.IMAGE]: ScrapedProductSelector;
  [PRODUCT_FIELDS.PRICE]: ScrapedProductSelector;
  [PRODUCT_FIELDS.TITLE]: ScrapedProductSelector;
  [PRODUCT_FIELDS.URL]: ScrapedProductSelector;
}

export interface ScrapedProductsParams {
  [PRODUCT_FIELDS.CATEGORY]: PRODUCT_CATEGORIES;
  [PRODUCT_FIELDS.DOMAIN]: PRODUCT_DOMAINS;
  searchValue: string;
}

export interface ScrapedProductParams
  extends Omit<ScrapedProductsParams, PRODUCT_FIELDS.DOMAIN> {
  [PRODUCT_FIELDS.DOMAIN]: Exclude<PRODUCT_DOMAINS, PRODUCT_DOMAINS.ALL>;
}

export interface PostProductsParams extends ScrapedProductsParams {
  stored: boolean;
}

export type DomainsProducs = Record<
  Exclude<PRODUCT_DOMAINS, PRODUCT_DOMAINS.ALL>,
  Product[] | []
>;

export const mapBuscapeProductsCategories = {
  [PRODUCT_CATEGORIES.MOBILE]: "celular",
  [PRODUCT_CATEGORIES.REFRIGERATOR]: "geladeira",
  [PRODUCT_CATEGORIES.TV]: "tv",
};

export const mapFreemarketProductsCategories = {
  [PRODUCT_CATEGORIES.MOBILE]: "celulares-telefones",
  [PRODUCT_CATEGORIES.REFRIGERATOR]: "geladeiras-freezers",
  [PRODUCT_CATEGORIES.TV]: "eletronicos-audio-video/televisores",
};

export const mapScrapedProducts = (
  scrapedProducts: ScrapedProducts,
  scrapedProductParams: Omit<ScrapedProductParams, "searchValue">
): Product[] =>
  fillProducts(
    filterProducts(createProducts(scrapedProducts)),
    scrapedProductParams
  );
