import 'reflect-metadata';
import {createConnection} from 'typeorm';
import Server, { Address } from './server';

createConnection()
	.then(async connection => {
		console.log('Connection to database has been established');

        const server = new Server();
        server.serve(4242)
	        .then((address: Address) => {
	        	console.log(`Server's launched at ${address.address}:${address.port}`);
	        })
	        .catch((error: string) => {
	        	console.error(error);
	        });
	})
	.catch(error => console.log(error));
