import express from "express";

const ProductsRouter = express.Router();

ProductsRouter.post("/", () => console.log("list and save products"));

ProductsRouter.post("/drop", () => console.log("drop products"));

export const PRODUCTS_ENDPOINT = "/products";

export default ProductsRouter;
