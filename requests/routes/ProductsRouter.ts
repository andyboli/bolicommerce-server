import express from "express";
import rescue from "express-rescue";

import { ProductsController } from "../../controllers";

const ProductsRouter = express.Router();

ProductsRouter.get(
  "/",
  rescue(() => console.log("Bolicommerce server is running"))
);

ProductsRouter.post("/", rescue(ProductsController.postProducts));

ProductsRouter.delete("/", rescue(ProductsController.deleteProducts));

export const PRODUCTS_ENDPOINT = "/products";

export default ProductsRouter;
