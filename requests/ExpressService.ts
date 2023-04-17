import {
  configExpressApp,
  createExpressApp,
  listenExpressApp,
  setExpressMiddlewares,
  setExpressRoutes,
} from "./ExpressUtils";

const startExpressApp = () => {
  const app = createExpressApp();
  configExpressApp(app);
  listenExpressApp(app);
  setExpressRoutes(app);
  setExpressMiddlewares(app);
};

const ExpressService = { startExpressApp };

export default ExpressService;
