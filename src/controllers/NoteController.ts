import Note from '@entities/Note';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export default class NoteController {
	public static async createNote(req: Request, res: Response) {
		const repository = getRepository(Note);
		const note = new Note();
		note.text = req.body.text;

		const result = await repository.save(note);
		res.status(201).json(result);
	}

	public static async getNotes(req: Request, res: Response) {
		const repository = getRepository(Note);

		res.status(200).send(await repository.find());
	}

	public static async getFilteredNotes(req: Request, res: Response) {
		res.status(200).send('Get Filtered Notes');
	}
}
