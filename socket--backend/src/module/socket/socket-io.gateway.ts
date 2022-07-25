import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { SocketService } from 'src/module/socket/socket.service';

@WebSocketGateway({ transports: ['websocket'] })
export class SocketIoGateway {
  constructor(private socketService: SocketService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('setStatus')
  setStatus(client: Socket, payload: any) {
    this.socketService.onlineUsers.push({
      socketId: client.id,
      id: payload.id,
      name: payload.name,
    });
    this.server.emit('userList', this.socketService.onlineUsers);
  }

  @SubscribeMessage('messageTo')
  sendTo(client: Socket, payload: any) {
    client.to(payload.to).emit('privateMessage', {
      from: client.id,
      message: payload.message,
    });
    this.socketService.addMessage({
      from: client.id,
      ...payload,
    });
  }

  @SubscribeMessage('getMessages')
  async getMessages(client: Socket, payload: any) {
    const messages = await this.socketService.getMessagesById(
      payload.from,
      payload.to,
    );
    client.emit('messageHistory', messages);
  }

  @SubscribeMessage('getRoomMessages')
  async getRoomMessages(client: Socket, payload: any) {
    const messages = await this.socketService.getRoomMessages(payload.room);
    client.emit('roomMessageHistory', messages);
  }

  @SubscribeMessage('messageToRoom')
  sendToRoom(client: Socket, payload: any) {
    client.to(`room-${payload.room}`).emit('roomMessage', {
      from: client.id,
      name: payload.name,
      message: payload.message,
    });
    this.socketService.addMessage(payload);
  }

  @SubscribeMessage('getAllRooms')
  async getAllRooms(client: Socket, payload: any) {
    const rooms = await this.socketService.getAllRooms(payload.userId);
    client.emit('roomsList', rooms);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, payload: any) {
    await client.join(`room-${payload.room}`);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, payload: any) {
    await client.leave(`room-${payload.room}`);
  }

  @SubscribeMessage('createRoom')
  async createRoom(client: Socket, payload: any) {
    const room = await this.socketService.createRoom(payload);
    if (room._id) {
      this.socketService.onlineUsers.forEach((user) => {
        if (room?.members?.map((id) => id?.toString())?.includes(user.id)) {
          client.to(user.socketId).emit('newRoom', room);
        }
      });
      client.emit('roomCreated', {
        message: 'Created room successfully',
        success: true,
      });
    } else {
      client.emit('roomCreated', {
        message: 'Something went wrong',
        success: false,
      });
    }
  }

  @SubscribeMessage('exitRoom')
  async exitRoom(client: Socket, payload: any) {
    const user = await this.socketService.exitRoom(
      payload.room,
      payload.userId,
    );
    client.to(`room-${payload.room}`).emit('roomMessage', {
      sender: payload.userId,
      message: `${user.name} left`,
      name: user.name,
    });
    this.socketService.addMessage({
      sender: payload.userId,
      message: `${user.name} left`,
      room: payload.room,
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`, args);
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    const index = this.socketService.onlineUsers.findIndex(
      (user) => user.socketId === client.id,
    );
    if (index > -1) this.socketService.onlineUsers.splice(index, 1);
    this.server.emit('userList', this.socketService.onlineUsers);
  }
}
