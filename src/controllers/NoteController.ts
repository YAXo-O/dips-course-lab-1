import Note from '@entities/Note';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { logger } from '../logger';

export default class NoteController {
	public static async createNote(req: Request, res: Response) {
		logger.info('Create note was called;');

		if (!req.body.text || req.body.text && !req.body.text.trim()) {
			res.status(400);

			return;
		}

		const repository = getRepository(Note);
		const note = new Note();
		note.text = req.body.text;
		note.dateCreated = new Date();

		const result = await repository.save(note);
		res.status(201).json(result);
	}

	public static async getNotes(req: Request, res: Response) {
		logger.info('Get notes was requested;');
		const repository = getRepository(Note);

		res.status(200).send(await repository.find());
	}

	public static async getFilteredNotes(req: Request, res: Response) {
		logger.info('Get filtered notes was requested;');

		const repository = getRepository(Note);
		let query = repository.createQueryBuilder('note');

		if (req.body.text) {
			const text = req.body.text.toLowerCase();
			logger.info(`Query text: ${text}`);
			query = query.where(`lower(note.text) Like '%${text}%'`);
		}

		if (req.body.dateCreatedFrom && new Date(req.body.dateCreatedFrom)) {
			const dateFrom = new Date(req.body.dateCreatedFrom);
			logger.info(`Date created from: ${dateFrom}`);
			query = query.andWhere('note.dateCreated >= :date', { date: dateFrom });
		}

		if (req.body.dateCreatedTo && new Date(req.body.dateCreatedTo)) {
			const dateTo = new Date(req.body.dateCreatedTo);
			logger.info(`Date created to: ${dateTo}`);
			query = query.andWhere('note.dateCreated < :date', { date: dateTo });
		}

		res.status(200).json(await query.orderBy('note.id').getMany());
	}
}
