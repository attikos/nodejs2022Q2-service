import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

type CreateUserDto = {
  login: string;
  password: string;
};

@Controller('user')
export class UserController {
  @Get()
  getAll(): string {
    return 'Все юзеры';
  }

  @Get(':userId')
  getById(@Param() params): string {
    console.log('params', params);

    return params.userId;
  }

  @Post()
  create(@Param() params, @Body() createUserDto: CreateUserDto): string {
    console.log('createUserDto', createUserDto);
    console.log('params', params);

    return JSON.stringify(createUserDto);
  }

  @Put(':userId')
  update(@Param() params, @Body() createUserDto: CreateUserDto): string {
    console.log('createUserDto', createUserDto);
    console.log('params', params);

    return JSON.stringify(createUserDto);
  }

  @Delete(':userId')
  delete(@Param() params): string {
    console.log('params', params);

    return params;
  }
}
