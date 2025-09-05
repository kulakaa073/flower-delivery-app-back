import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import indexRouter from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = getEnvVar('PORT', 3000);
const HOST = getEnvVar('APP_DOMAIN');

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.status(200).json({
      message: `Welcome to MongoDB test API! OpenAPI documentation is available at ${HOST}/api-docs`,
    });
  });

  app.use('/api', indexRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`OpenAPI documentation is available at ${HOST}/api-docs`);
  });
};
