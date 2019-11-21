import NoteController from '@controller/NoteController';
import { Request, Response } from 'express';
import { allNotesList, createdNote, repository } from './mocks';

jest.mock('typeorm', () => ({
	Column: () => jest.fn(),
	Entity: () => jest.fn(),
	PrimaryGeneratedColumn: () => jest.fn(),
	getRepository: jest.fn(),
}));

import { getRepository } from 'typeorm';

describe('Note Controller tests', () => {
	it('Get notes', async () => {
		const request: Partial<Request> = {};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.send = jest.fn().mockReturnValue(response);

		// @ts-ignore
		getRepository.mockReturnValueOnce(repository);

		await NoteController.getNotes(request as any, response as any);

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalledWith(allNotesList);
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

		// @ts-ignore
		getRepository.mockReturnValueOnce(repository);

		await NoteController.createNote(request as any, response as any);

		expect(response.status).toBeCalledWith(201);
		expect(response.json).toBeCalledWith(createdNote);
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

		// @ts-ignore
		getRepository.mockReturnValueOnce(repository);

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

		// @ts-ignore
		getRepository.mockReturnValueOnce(repository);

		await NoteController.getFilteredNotes(request as any, response as any);

		expect(response.status).toBeCalledWith(200);
		expect(response.json).toBeCalledWith(allNotesList);
	});
});
