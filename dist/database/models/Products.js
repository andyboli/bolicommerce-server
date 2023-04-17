"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product_1 = require("../../entities/Product");
const Products = (sequelize) => {
    const productsModelName = "products";
    const productsModelAttributes = {
        category: {
            type: sequelize_1.DataTypes.STRING,
            validate: { isIn: [Object.values(Product_1.PRODUCT_CATEGORIES)] },
        },
        description: { type: sequelize_1.DataTypes.STRING },
        domain: {
            type: sequelize_1.DataTypes.STRING,
            validate: { isIn: [Object.values(Product_1.PRODUCT_DOMAINS)] },
        },
        image: { type: sequelize_1.DataTypes.STRING },
        price: { type: sequelize_1.DataTypes.STRING },
        title: { type: sequelize_1.DataTypes.STRING },
        url: { type: sequelize_1.DataTypes.STRING },
    };
    return sequelize.define(productsModelName, productsModelAttributes, {
        freezeTableName: true,
        timestamps: false,
    });
};
exports.default = Products;
