import { RequestHandler } from "express";

import { PostProductsParams } from "../entities/Product";

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
  console.log("postProducts", postProducts);
};

const ProductsController = {
  deleteProducts,
  postProducts,
};

export default ProductsController;
