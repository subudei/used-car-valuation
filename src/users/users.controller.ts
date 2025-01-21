import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto) // using custom interceptor to remove password from the response on all the methods(controllers) in this controller
@Controller('auth')
// @UseInterceptors(CurrentUserInterceptor) // insted of using interceptor here we can use APP_INTERCEPTOR in the app.module.ts file
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Session testing

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  // @Get('/userinfo')
  // async userInfo(@Session() session: any) {
  //   const user = await this.usersService.findOne(session.userId);
  //   if (!user) {
  //     throw new NotFoundException('You are not logged in');
  //   }
  //   return user;
  // }

  @Get('/currentuser')
  currentUser(@CurrentUser() user: User) {
    // user is the user object that we set in the CurrentUserInterceptor
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // this.usersService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async login(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(ClassSerializerInterceptor) // ClassSerializerInterceptor is used to apply the class-transformer library to the response of the findUser method. This interceptor automatically transforms the response object using the class-transformer library before sending it back to the client. *removing password from the response, using the @Exclude() decorator in the User entity
  // @UseInterceptors(new SerializeInterceptor(UserDto)) // using custom interceptor to remove password from the response
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
