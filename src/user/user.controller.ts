import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  @HttpCode(200)
  findOne(@Param() { userId }) {
    return this.userService.findOne(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Param() params, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':userId')
  update(@Param() { userId }, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateEmpty() {
    throw new BadRequestException('Id is not valid');
  }

  @HttpCode(204)
  @Delete(':userId')
  delete(@Param() { userId }) {
    return this.userService.delete(userId);
  }
}
