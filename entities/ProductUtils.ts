import {
  ScrapedProducts,
  Product,
  ScrapedProductParams,
  PRODUCT_DOMAINS,
} from "./Product";

export const createProducts = (
  scrapedProducts: ScrapedProducts
): Partial<Product>[] =>
  Object.entries(scrapedProducts).reduce(
    (
      products: Partial<Product>[],
      [field, fieldValues]: [string, string[]]
    ) => {
      fieldValues.forEach((fieldValue, productIndex) => {
        products[productIndex] = {
          ...(products[productIndex] || {}),
          [field]: fieldValue,
        };
      });
      return products;
    },
    []
  );

export const filterProducts = (
  products: Partial<Product>[]
): Partial<Product>[] => {
  const imageRegex = new RegExp("https?://(www.)?");
  return products.filter(
    ({ image, price, title, url }) =>
      !!image && image.match(imageRegex) && !!url && !!price && !!title
  );
};

const mapBuscapeUrlField = (url: string) => {
  const baseUrl = "https://www.buscape.com.br";
  const urlRegex = new RegExp(
    "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)"
  );
  return url.match(urlRegex) ? baseUrl + url : url;
};

const fillBuscapeProducts = (product: Partial<Product>): Partial<Product> => ({
  ...product,
  url: product.url ? mapBuscapeUrlField(product.url) : "",
});

const mapFreemarketPriceField = (price: string) => {
  const priceNumbers = price
    .split(" ")
    .map((label) => Number(label))
    .filter((value) => !isNaN(value));
  return priceNumbers[1]
    ? `R$${priceNumbers[0]},${priceNumbers[1]}`
    : `R$${priceNumbers[0]},00`;
};

const fillFreemarketProducts = (
  product: Partial<Product>
): Partial<Product> => ({
  ...product,
  price: product.price ? mapFreemarketPriceField(product.price) : "",
});

const mapDomainToFillFunction = {
  [PRODUCT_DOMAINS.BUSCAPE]: fillBuscapeProducts,
  [PRODUCT_DOMAINS.FREEEMARKET]: fillFreemarketProducts,
};

export const fillProducts = (
  products: Partial<Product>[],
  scrapedProductParams: Omit<ScrapedProductParams, "searchValue">
): Product[] => {
  return products.map((product) => ({
    category: scrapedProductParams.category,
    description: product.description || "",
    domain: scrapedProductParams.domain,
    image: product.image || "",
    price: product.price || "",
    title: product.title || "",
    url: product.url || "",
    ...mapDomainToFillFunction[scrapedProductParams.domain](product),
  }));
};
