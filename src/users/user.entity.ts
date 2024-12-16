// import { Exclude } from 'class-transformer'; // Exclude is a decorator from the class-transformer library that allows you to exclude a property from the response object.
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // removing password from the response (nest docs), insted using custom interceptor to remove password from the response
  password: string;

  // decorator hooks
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id ->', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id ->', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id ->', this.id);
  }
}
