"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressUtils_1 = require("./ExpressUtils");
const startExpressApp = () => {
    const app = (0, ExpressUtils_1.createExpressApp)();
    (0, ExpressUtils_1.configExpressApp)(app);
    (0, ExpressUtils_1.listenExpressApp)(app);
    (0, ExpressUtils_1.setExpressRoutes)(app);
    (0, ExpressUtils_1.setExpressMiddlewares)(app);
};
const ExpressService = { startExpressApp };
exports.default = ExpressService;
