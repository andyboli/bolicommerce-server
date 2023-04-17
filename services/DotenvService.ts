import dotenv from "dotenv";
import HapiBoomService from "@hapi/boom";

dotenv.config();

const getEnv = (envKey: string) => {
  const envValue = process.env[envKey];
  if (!envValue)
    return HapiBoomService.badImplementation(
      `Environment variable ${envKey} doesn't exist`
    );
  return envValue;
};

const DotenvService = {
  getEnv,
};

export default DotenvService;
