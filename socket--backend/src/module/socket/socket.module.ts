import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserSchema } from './../../user/entities/user.entity';
import { SocketIoGateway } from 'src/module/socket/socket-io.gateway';
import { MessagesSchema } from './schema/messages';
import { RoomSchema } from './schema/room';
import { SocketService } from './socket.service';

@Module({
  providers: [
    SocketService,
    SocketIoGateway,
    {
      provide: 'DB_CONNECTION',
      useFactory: () => {
        return mongoose.connect(process.env.DB_URL);
      },
    },
    {
      provide: 'MessageModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('MessageModel', MessagesSchema),
      inject: ['DB_CONNECTION'],
    },
    {
      provide: 'RoomModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('RoomModel', RoomSchema),
      inject: ['DB_CONNECTION'],
    },
    {
      provide: 'UserModel',
      useFactory: (connection: mongoose.Connection) =>
        connection.model('UserModel', UserSchema),
      inject: ['DB_CONNECTION'],
    },
  ],
})
export class SocketModule {}
