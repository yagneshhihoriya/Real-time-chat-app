import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import mongoose from 'mongoose';
import { UserSchema } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './module/socket/socket.module';

@Module({
  imports: [
    SocketModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: 'secret from env',
      // signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [UserController],
  providers: [
    JwtStrategy,
    UserService,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'UserModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('UserModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class AppModule {}
