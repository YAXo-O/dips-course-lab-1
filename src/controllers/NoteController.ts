import {Request, Response} from 'express';

export default class NoteController {
	static async createNote(req: Request, res: Response) {
		res.status(200).send('Create Note')
	}

	static async getNotes(req: Request, res: Response) {
		res.status(200).send('Get Notes');
	}

	static async getFilteredNotes(req: Request, res: Response) {
		res.status(200).send('Get Filtered Notes');
	}
}