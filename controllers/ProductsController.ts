import { RequestHandler } from "express";

import { PostProductsParams } from "../entities/Product";
import { PuppeteerService } from "../services";

const deleteProducts: RequestHandler<
  Express.Request,
  Express.Response
> = async (_request, response) => {
  console.log("deleteProducts", deleteProducts);
};

const postProducts: RequestHandler<Express.Request, Express.Response> = async (
  request,
  response
) => {
  const {
    data: { stored, ...scrapeDomainsParams },
  } = request.body as { data: PostProductsParams };
  if (!stored) {
    const products = await PuppeteerService.scrapeProducts(scrapeDomainsParams);
    return response.status(200).json({ products, stored: false });
  }
};

const ProductsController = {
  deleteProducts,
  postProducts,
};

export default ProductsController;
