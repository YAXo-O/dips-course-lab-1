import NoteController from '@controller/NoteController';
import { Request, Response } from 'express';

const notesList = [
	{
		dateCreated: new Date('1997-02-23'),
		id: 1,
		text: 'First note',
	},
	{
		dateCreated: new Date('1999-11-24'),
		id: 2,
		text: 'Second note',
	},
];

jest.mock('typeorm', () => ({
	Column: () => jest.fn(),
	Entity: () => jest.fn(),
	PrimaryGeneratedColumn: () => jest.fn(),
	getRepository: jest.fn().mockReturnValue({
		find: () => Promise.resolve(notesList),
		save: () => Promise.resolve({
			dateCreated: new Date('1963-11-23'),
			id: 1,
			text: 'Some note text',
		}),
	}),
}));

describe('Note Controller tests', () => {
	it('Get notes', async () => {
		const request: Partial<Request> = {};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.send = jest.fn().mockReturnValue(response);

		await NoteController.getNotes(request as any, response as any);

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalledWith(notesList);
	});

	it('Create note: valid note', async () => {
		const request: Partial<Request> = {
			body: {
				text: 'Some note text',
			},
		};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.json = jest.fn().mockReturnValue(response);

		await NoteController.createNote(request as any, response as any);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith({
			dateCreated: new Date('1963-11-23'),
			id: 1,
			text: 'Some note text',
		});
	});

	it('Create note: empty note', async () => {
		const request: Partial<Request> = {
			body: {
				text: '',
			},
		};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.json = jest.fn().mockReturnValue(response);

		await NoteController.createNote(request as any, response as any);

		expect(response.status).toBeCalledWith(400);
		expect(response.json).toBeCalledTimes(0);
	});

	it('Create note: whitespace note', async () => {
		const request: Partial<Request> = {
			body: {
				text: '  ',
			},
		};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.json = jest.fn().mockReturnValue(response);

		await NoteController.createNote(request as any, response as any);

		expect(response.status).toBeCalledWith(400);
		expect(response.json).toBeCalledTimes(0);
	});

	it('Get filtered notes: no filters', async () => {
		const request: Partial<Request> = {
			body: {
			},
		};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.json = jest.fn().mockReturnValue(response);

		await NoteController.getFilteredNotes(request as any, response as any);

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(notesList);
	});
});
