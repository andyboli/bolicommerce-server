import { RequestHandler } from "express";
import HapiBoomService from "@hapi/boom";

import { PostProductsParams } from "../entities/Product";
import { ProductsQueries } from "../database";
import { PuppeteerService } from "../services";

const deleteProducts: RequestHandler<
  Express.Request,
  Express.Response
> = async (_request, response) => {
  try {
    await ProductsQueries.dropProducts();
    return response.status(200);
  } catch (err) {
    return HapiBoomService.badImplementation(
      `Error on deleteProducts\n${(err as any)?.name}: ${(err as any)?.message}`
    );
  }
};

const postProducts: RequestHandler<Express.Request, Express.Response> = async (
  request,
  response
) => {
  const {
    data: { stored, ...scrapeParams },
  } = request.body as { data: PostProductsParams };
  try {
    if (!stored) {
      const products = await PuppeteerService.scrapeProducts(scrapeParams);
      await ProductsQueries.saveProducts(products);
      return response.status(200).json({ products, stored: true });
    } else {
      const products = await ProductsQueries.findProducts(scrapeParams);
      return response.status(200).json({ products, stored: true });
    }
  } catch (err) {
    return HapiBoomService.badImplementation(
      `Error on postProducts\n${(err as any)?.name}: ${(err as any)?.message}`
    );
  }
};

const ProductsController = {
  deleteProducts,
  postProducts,
};

export default ProductsController;
