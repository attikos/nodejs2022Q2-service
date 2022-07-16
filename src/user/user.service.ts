import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { v4, validate } from 'uuid';
import { userDB } from 'src/user/user.db';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class UserService {
  create(data: CreateUserDto) {
    const { login, password } = data || {};

    const newUser = {
      id: v4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      login,
      password,
    };

    userDB.push(newUser);

    return newUser;
  }

  getById(id: string) {
    checkValidation(id);

    const user = userDB.find((user) => user.id === id);

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  getAll() {
    return userDB;
  }

  update(id: string, data: UpdateUserDto) {
    const { oldPassword, newPassword } = data;

    if (!oldPassword) {
      throw new BadRequestException('oldPassword is required');
    }

    if (!newPassword) {
      throw new BadRequestException('newPassword is required');
    }

    checkValidation(id);
    const currentUser = userDB.find((user) => user.id === id);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    if (currentUser.password !== data.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    currentUser.password = data.newPassword;
    currentUser.version++;
    currentUser.updatedAt = new Date().getTime();

    return currentUser;
  }

  delete(id: string) {
    checkValidation(id);

    const userIndex = userDB.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    userDB.splice(userIndex, 1);
  }
}
