import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn() // primaryGeneratedColumn is typeorm decorator used to generate primary key, it can be used with number, string, or UUID, it can be used with auto increment or not
  id: number;

  @Column()
  price: number;
}
