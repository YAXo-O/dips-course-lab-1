import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { logger } from './logger';
import Server, { Address } from './server';

createConnection()
	.then(async (connection) => {
		logger.info('Connection to database has been established');
		const server = new Server();

		server.serve(4242)
		  .then((address: Address) => {
				logger.info(`Server's launched at ${address.address}:${address.port}`);
			})
		  .catch((error: string) => {
				logger.error(error);
			});
	})
	.catch((error) => logger.error(error));
