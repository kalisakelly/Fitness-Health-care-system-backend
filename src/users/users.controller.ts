import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { User } from './entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  getMe(@Req() {user}) {
    return user;
  }

  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userid')
  findOne(@Param('userid') userid: number) {
    return this.usersService.findOne(userid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Patch(':userid/role')
  async updaterole(@Param('userid') userid: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updaterole(userid, updateUserDto);
  }

  
}
