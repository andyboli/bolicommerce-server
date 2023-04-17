import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { DotenvService } from "../services";
import { ErrorMiddleware } from "./middlewares";
import { ProductsRouter, PRODUCTS_ENDPOINT } from "./routes";

export const createExpressApp = () => express();

export const configExpressApp = (app: Express) => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({ origin: DotenvService.getEnv("CLIENT_DOMAIN") as string }));
};

export const listenExpressApp = (app: Express) => {
  const PORT = DotenvService.getEnv("PORT") as string;
  const NODE_ENV = DotenvService.getEnv("NODE_ENV") as string;
  app.listen(
    PORT,
    () => NODE_ENV === "development" && console.log(`Listening on ${PORT}`)
  );
};

export const setExpressRoutes = (app: Express) => {
  app.use(PRODUCTS_ENDPOINT, ProductsRouter);
};

export const setExpressMiddlewares = (app: Express) => {
  app.use(ErrorMiddleware);
};
