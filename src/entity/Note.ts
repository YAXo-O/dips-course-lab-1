import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @Column('timestamp')
    dateCreated: Date;
}