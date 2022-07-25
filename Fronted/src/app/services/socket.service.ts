import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser, UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private userService: UserService) {}

  // called when connected once
  setStatus() {
    this.socket.connect();
    const userDetails: Partial<IUser> = this.userService.getUserDetails();
    this.socket.emit('setStatus', {
      id: userDetails._id,
      name: userDetails.name,
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  getOnlineUsers(): any {
    return this.socket.fromEvent('userList');
  }

  sendMessage(payload: any) {
    this.socket.emit('messageTo', payload);
  }

  sendMessageInRoom(payload: any) {
    this.socket.emit('messageToRoom', payload);
  }

  getMessages() {
    return this.socket.fromEvent('privateMessage');
  }

  getOlderMessages(to: string, from: string) {
    this.socket.emit('getMessages', {
      from,
      to,
    });
    return this.socket.fromEvent('messageHistory');
  }

  //  === room services ===
  getRoomMessages() {
    return this.socket.fromEvent('roomMessage');
  }

  getRooms(id: string) {
    this.socket.emit('getAllRooms', { userId: id });
    return this.socket.fromEvent('roomsList');
  }

  getOlderRoomMessages(room: string) {
    this.socket.emit('getRoomMessages', { room });
    return this.socket.fromEvent('roomMessageHistory');
  }

  createRoom(payload: any) {
    this.socket.emit('createRoom', payload);
    return this.socket.fromEvent('roomCreated');
  }

  exitRoom(payload: any) {
    this.socket.emit('exitRoom', payload);
  }

  checkNewRoom() {
    return this.socket.fromEvent('newRoom');
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', { room });
  }
  
  leaveRoom(room: string) {
    this.socket.emit('leaveRoom', { room });
  }
}
