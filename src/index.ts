import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import { logger } from './logger';
import Server, { Address } from './server';

const port: number = +process.env.PORT || 4242;

createConnection(config as any)
	.then(async (connection) => {
		logger.info('Connection to database has been established');
		const server = new Server();

		server.serve(port)
		  .then((address: Address) => {
				logger.info(`Server's launched at ${address.address}:${address.port}`);
			})
		  .catch((error: string) => {
				logger.error(error);
			});
	})
	.catch((error) => logger.error(error));
