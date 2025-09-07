import path from 'node:path';

export const SORT_ORDER = {
  ASC: 1,
  DESC: -1,
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
