import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  /*
  InjectRepository is a decorator provided by the TypeORM library. It is used to inject a repository instance into the UsersService class.
  Repositories in TypeORM are responsible for handling database operations for a specific entity. They provide methods for querying, creating, updating, and deleting records in the corresponding database table.
  By using the InjectRepository decorator, we are instructing the dependency injection system to provide an instance of the Repository<User> class when creating an instance of the UsersService class. The Repository<User> type specifies that the repository is specifically for the User entity.
  The @InjectRepository(User) decorator is applied to the repo parameter in the constructor of the UsersService class. This tells the dependency injection system to inject an instance of the Repository<User> class into the repo parameter.
  Once the repository is injected, it can be used within the UsersService class to perform database operations related to the User entity. In this case, the create method uses the injected repository to create a new user object and save it to the database.

  Overall, the InjectRepository decorator simplifies the process of injecting a repository instance into a service class, allowing us to easily perform database operations within the service.
*/
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create() is used to create an entity instance with the specified data. It does not save the entity to the database immediately; it simply creates an instance of the entity with the provided data.
    const user = this.repo.create({ email, password });
    // save() is used to persist the entity to the database. It takes the entity instance created using the create() method and saves it to the database table associated with the entity.
    return this.repo.save(user);
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    //return this.repo.delete(id); one way to delete, only one call to the database , no need to find the user first, but it is not recommended
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.remove(user);
  }
}
