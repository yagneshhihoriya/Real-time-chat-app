import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UserRequestDto } from './dto/userDto';
import { LoginDto } from './dto/loginDto';
import { CreateUserDto } from './dto/createUserDto';
import { TypeExceptions } from './../exception';

@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @ApiBody({ type: UserRequestDto })
  @Post('users')
  async createUser(@Body() userData: CreateUserDto) {
    if (!userData || !userData.name || !userData.email || !userData.contact) {
      throw TypeExceptions.UserInsufficient();
    }
    return this.appService.createUser(userData);
  }

  @Post('users/login')
  @ApiBody({ type: LoginDto })
  async loginUser(@Body() params: LoginDto) {
    return await this.appService.login(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.appService.getUserById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUser() {
    const users = await this.appService.getAllUser();
    return {
      success: true,
      users,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() userData: UserRequestDto,
  ) {
    return await this.appService.updateUserById(id, userData);
  }

  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUserById(@Param() param: any) {
    const deletedUser = await this.appService.deleteUserById(param['id']);
    if (deletedUser.deletedCount === 0) {
      throw new HttpException(
        {
          status: 404,
          error: 'user not found',
          message: 'User does not exist',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
