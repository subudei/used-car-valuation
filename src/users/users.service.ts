import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // injectRepository User is used for generic type Repository<User>
  // repo is argument name, Repository<User> is the type
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create is a method from the repo object
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
}
