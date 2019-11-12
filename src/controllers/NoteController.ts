import {Request, Response} from 'express';

export default class NoteController {
	public static async createNote(req: Request, res: Response) {
		res.status(200).send('Create Note');
	}

	public static async getNotes(req: Request, res: Response) {
		res.status(200).send('Get Notes');
	}

	public static async getFilteredNotes(req: Request, res: Response) {
		res.status(200).send('Get Filtered Notes');
	}
}
