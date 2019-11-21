import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Note {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column('text')
	public text: string;

	@Column('timestamp')
	public dateCreated: Date;
}
