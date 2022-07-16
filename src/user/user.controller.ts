import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  getAll() {
    const users = this.userService.getAll();

    return users.map((user) => new UserEntity(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @HttpCode(200)
  getById(@Param() { userId }) {
    const users = this.userService.getById(userId);

    return new UserEntity(users);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Param() params, @Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    console.log('params', params);

    const user = this.userService.create(createUserDto);

    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  update(@Param() { userId }, @Body() updateUserDto: UpdateUserDto) {
    const user = this.userService.update(userId, updateUserDto);

    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @Delete(':userId')
  @HttpCode(204)
  delete(@Param() { userId }) {
    this.userService.delete(userId);

    return;
  }
}
