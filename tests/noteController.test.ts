import NoteController from '@controller/NoteController';
import { Request, Response } from 'express';

const notesList = [
	{
		dateCreated: new Date('23-02-1997'),
		id: 1,
		text: 'First note',
	},
	{
		dateCreated: new Date('24-11-1999'),
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
	}),
}));

describe('Note Controller tests', () => {
	it('Get Notes test (successful db connection)', async () => {
		const request: Partial<Request> = {};
		const response: Partial<Response> = {};
		response.status = jest.fn().mockReturnValue(response);
		response.send = jest.fn().mockReturnValue(response);

		await NoteController.getNotes(request as any, response as any);

		expect(response.status).toBeCalledWith(200);
		expect(response.send).toBeCalledWith(notesList);
	});
});
