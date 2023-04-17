import {
  DataTypes,
  ModelAttributeColumnOptions,
  ModelDefined,
  Optional,
  Sequelize,
} from "sequelize";

import {
  PRODUCT_CATEGORIES,
  PRODUCT_DOMAINS,
  PRODUCT_FIELDS,
  Product,
} from "../../entities/Product";

const Products = (
  sequelize: Sequelize
): ModelDefined<Product, Optional<Product, any>> => {
  const productsModelName = "products";
  const productsModelAttributes: Record<
    PRODUCT_FIELDS,
    ModelAttributeColumnOptions
  > = {
    category: {
      type: DataTypes.STRING,
      validate: { isIn: [Object.values(PRODUCT_CATEGORIES)] },
    },
    description: { type: DataTypes.STRING },
    domain: {
      type: DataTypes.STRING,
      validate: { isIn: [Object.values(PRODUCT_DOMAINS)] },
    },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
  };
  return sequelize.define(productsModelName, productsModelAttributes, {
    freezeTableName: true,
    timestamps: false,
  });
};

export default Products;
