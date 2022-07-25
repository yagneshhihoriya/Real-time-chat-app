import { NotFoundException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { UserRequestDto } from './dto/userDto';
import { TypeExceptions } from './../exception';
import { CreateUserDto } from './dto/createUserDto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
// import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  getAllUser() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
    try {
      const find = await this.userModel.findById(id);
      if (!find) {
        return TypeExceptions.UserNotFound();
      }
      return find;
    } catch (error) {
      return TypeExceptions.UserNotExists();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      const data = await this.userModel.findOne({ email: createUserDto.email });
      if (data) {
        return TypeExceptions.AlreadyEmailExists();
      }
      const dataa = await this.userModel.findOne({
        contact: createUserDto.contact,
      });
      if (dataa) {
        return TypeExceptions.AlreadyContactExists();
      }
      return user.save();
    } catch (err) {
      console.log(err);
    }
  }

  async updateUserById(id: string, userData: UserRequestDto) {
    try {
      // const user = await this.userModel.findOne({ _id: id });
      // if(!user){
      //   throw TypeExceptions.UserNotFound();
      // }
      return await this.userModel.findOneAndUpdate({ _id: id }, userData, {
        new: true,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  deleteUserById(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    });
  }

  async login(params: LoginDto) {
    const user = await this.userModel.findOne(params);

    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    return user
      ? {
          token: this.jwtService.sign({
            _id: user._id,
            email: user.email,
            admin: user.admin,
            name: user.name,
          }),
          _id: user._id,
          email: user.email,
          admin: user.admin,
          name: user.name,
        }
      : null;
  }
}
