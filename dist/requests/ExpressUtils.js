"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setExpressMiddlewares = exports.setExpressRoutes = exports.listenExpressApp = exports.configExpressApp = exports.createExpressApp = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_rescue_1 = __importDefault(require("express-rescue"));
const services_1 = require("../services");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const createExpressApp = () => (0, express_1.default)();
exports.createExpressApp = createExpressApp;
const configExpressApp = (app) => {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
};
exports.configExpressApp = configExpressApp;
const listenExpressApp = (app) => {
    const PORT = services_1.DotenvService.getEnv("PORT");
    const NODE_ENV = services_1.DotenvService.getEnv("NODE_ENV");
    app.listen(PORT, () => NODE_ENV === "development" && console.log(`Listening on ${PORT}`));
};
exports.listenExpressApp = listenExpressApp;
const setExpressRoutes = (app) => {
    app.use("/", express_1.default.Router().get("/", (0, express_rescue_1.default)((_req, res) => res.status(200).json({ messabe: "The Bolicommerce server is running" }))));
    app.use(routes_1.PRODUCTS_ENDPOINT, routes_1.ProductsRouter);
};
exports.setExpressRoutes = setExpressRoutes;
const setExpressMiddlewares = (app) => {
    app.use(middlewares_1.ErrorMiddleware);
};
exports.setExpressMiddlewares = setExpressMiddlewares;
