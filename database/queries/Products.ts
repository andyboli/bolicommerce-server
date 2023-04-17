import { ModelDefined, Optional, Op } from "sequelize";
import HapiBoomService from "@hapi/boom";

import {
  DomainsProducs,
  mapDatabaseProducts,
  Product,
  ScrapedProductsParams,
  PRODUCT_DOMAINS,
} from "../../entities/Product";
import Models from "../models";

const ProductModel = Models.products as ModelDefined<
  Product,
  Optional<Product, any>
>;

const findProducts = async ({
  category,
  domain,
  searchValue,
}: ScrapedProductsParams) => {
  try {
    const products = await ProductModel.findAll({
      where: {
        category: category,
        domain: {
          [Op.or]:
            domain === PRODUCT_DOMAINS.ALL
              ? [PRODUCT_DOMAINS.BUSCAPE, PRODUCT_DOMAINS.FREEEMARKET]
              : [domain],
        },
        title: { [Op.substring]: searchValue },
      },
    });
    return mapDatabaseProducts(products.map((product) => product.toJSON()));
  } catch (err) {
    return HapiBoomService.badImplementation(
      `Database error - findProducts\n${(err as any)?.name}: ${
        (err as any)?.message
      }`
    );
  }
};

const saveProduct = async (product: Partial<Product>) => {
  try {
    return ProductModel.create(product);
  } catch (err) {
    return HapiBoomService.badImplementation(
      `Database error - saveProduct\n${(err as any)?.name}: ${
        (err as any)?.message
      }`
    );
  }
};

const saveProducts = (products: DomainsProducs) =>
  Promise.all(
    [...products.buscape, ...products.freemarket].map((product) =>
      saveProduct(product)
    )
  );

const dropProducts = async () => {
  try {
    return ProductModel.drop();
  } catch (err) {
    return HapiBoomService.badImplementation(
      `Database error - dropProducts\n${(err as any)?.name}: ${
        (err as any)?.message
      }`
    );
  }
};

const ProductsQueries = {
  dropProducts,
  findProducts,
  saveProducts,
};

export default ProductsQueries;
