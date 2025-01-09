import { BadRequestException, Injectable } from '@nestjs/common';
import { scrypt as _script, randomBytes } from 'crypto'; // crypto is a built-in module in Node.js that provides cryptographic functionality. The randomBytes function is used to generate a random salt, and the scrypt function is used to hash the password with the salt.
import { promisify } from 'util'; // util is a built-in module in Node.js that provides utility functions for working with objects and strings. The promisify function is used to convert callback-based functions into Promise-based functions.
import { UsersService } from './users.service';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    // #1 - check if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // #2 - hash the users password
    // #2.1 = generate the salt
    const salt = randomBytes(8).toString('hex');

    // #2.2 - hash the password with the salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //#2.3 - join the hashed result with the salt
    const result = salt + '.' + hash.toString('hex');

    // #3 - create a new user and save it
    const user = await this.usersService.create(email, result);
    // #4 - return the user
    return user;
  }

  login() {}
}
