import merge from "deepmerge";

import { ScrapedProducts } from "../entities/Product";

const mergePagesFields = (
  fields: Partial<ScrapedProducts>,
  pageFields: ScrapedProducts | void
) => {
  if (pageFields) return merge(fields, pageFields);
  return fields;
};

const DeepmergeService = {
  mergePagesFields,
};

export default DeepmergeService;
