import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { validate } from 'uuid';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

const checkValidation = (id: string) => {
  if (!validate(id)) {
    throw new BadRequestException('Id is not valid');
  }
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: UserDto) {
    await this.isloginExists(userDto.login);

    const createdUser = this.userRepository.create(userDto);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string) {
    checkValidation(userId);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user) {
      return user.toResponse();
    }

    throw new NotFoundException(`User with id = ${userId} not found`);
  }

  async update(userId: string, userDto: UpdateUserDto) {
    checkValidation(userId);

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (updatedUser) {
      if (updatedUser.password !== userDto.oldPassword) {
        throw new ForbiddenException('Wrong old password');
      }

      Object.assign(updatedUser, userDto);

      return await this.userRepository.save(updatedUser);
    }

    throw new NotFoundException(`User with id = ${userId} not found`);
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });

    return user;
  }

  async isloginExists(login: string) {
    const user = await this.findByLogin(login);

    if (user) {
      throw new BadRequestException(
        `User with login = ${login} already exists`,
      );
    }
  }

  async delete(userId: string) {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} not found`);
    }
  }

  // const { login, password } = data || {};

  // const newUser = {
  //   id: v4(),
  //   version: 1,
  //   createdAt: new Date().getTime(),
  //   updatedAt: new Date().getTime(),
  //   login,
  //   password,
  // };

  // userDB.push(newUser);

  // return newUser;
  //   }

  // create(data: UserDto) {
  //   const { login, password } = data || {};

  //   const newUser = {
  //     id: v4(),
  //     version: 1,
  //     createdAt: new Date().getTime(),
  //     updatedAt: new Date().getTime(),
  //     login,
  //     password,
  //   };

  //   userDB.push(newUser);

  //   return newUser;
  // }

  // getById(id: string) {
  //     checkValidation(id);

  //     const user = userDB.find((user) => user.id === id);

  //     if (user) {
  //     return user;
  //     }

  //     throw new NotFoundException('User not found');
  // }

  // getAll() {
  //     return userDB;
  // }

  // update(id: string, data: UpdateUserDto) {
  //     const { oldPassword, newPassword } = data;

  //     if (!oldPassword) {
  //     throw new BadRequestException('oldPassword is required');
  //     }

  //     if (!newPassword) {
  //     throw new BadRequestException('newPassword is required');
  //     }

  //     checkValidation(id);
  //     const currentUser = userDB.find((user) => user.id === id);

  //     if (!currentUser) {
  //     throw new NotFoundException('User not found');
  //     }

  //     if (currentUser.password !== data.oldPassword) {
  //     throw new ForbiddenException('Wrong old password');
  //     }

  //     currentUser.password = data.newPassword;
  //     currentUser.version++;
  //     currentUser.updatedAt = new Date().getTime();

  //     return currentUser;
  // }

  //   delete(id: string) {
  //     checkValidation(id);

  //     const userIndex = userDB.findIndex((user) => user.id === id);

  //     if (userIndex === -1) {
  //       throw new NotFoundException('User not found');
  //     }

  //     userDB.splice(userIndex, 1);
  //   }
}
