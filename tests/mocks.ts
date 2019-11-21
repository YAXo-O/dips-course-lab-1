export const allNotesList = [
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

export const createdNote = {
	dateCreated: new Date('1963-11-23'),
	id: 1,
	text: 'Some note text',
};

export const queryCreator = {
	andWhere: (condition: string, params?: any) => queryCreator,
	getMany: () => Promise.resolve(allNotesList),
	orderBy: (selector: string) => queryCreator,
	where: (condition: string) => queryCreator,
};

export const repository = {
	createQueryBuilder: jest.fn().mockReturnValue(queryCreator),
	find: jest.fn().mockResolvedValue(allNotesList),
	save: jest.fn().mockResolvedValue(createdNote),
};
