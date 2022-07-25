import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { IUser, UserService } from 'src/app/services/user.service';

export interface IChatUser {
  id: string;
  name: string;
  socketId: string;
  show?: boolean;
  isWindowOpen: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  onlineUsers: IChatUser[] = [];
  drawerOpen = true;
  currentUserDetails: IUser = {};
  chatWindow: any[] = [];
  roomChatWindow: any[] = [];
  rooms: any[] = [];
  createRoomModal = false;
  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUserDetails = this.userService.getUserDetails();
    this.getRooms();
    this.checkNewRoom();
    this.socketService.getOnlineUsers().subscribe((res: any[]) => {
      this.onlineUsers = res;
      this.chatWindow.forEach((window) => {
        const user = this.onlineUsers.find((user) => user.id === window.id);
        window.socketId = user?.socketId || window.socketId;
      });
    });
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  toggleCreateRoom() {
    this.createRoomModal = !this.createRoomModal;
  }

  handleCloseCreateRoom(data: any) {
    this.createRoomModal = false;
    if (data?.close && data?.close) {
      this.getRooms();
    }
  }

  onAddRoom() {
    this.createRoomModal = true;
  }

  onItemClick(user: IChatUser, type: 'room' | 'user') {
    if (user.isWindowOpen !== true) {
      // if (type === 'room') {

      // } else {
      // }
      this.chatWindow.push({ ...user, type });
      user.isWindowOpen = true;
    }
  }

  handleClose(data: any) {
    if (data?.close && data?.user?.socketId) {
      const index = this.chatWindow.findIndex(
        (window) => window.socketId === data.user.socketId
      );
      if (index > -1) {
        this.chatWindow.splice(index, 1);
        const user = this.onlineUsers.find(
          (user) => user.socketId === data.user.socketId
        );
        if (user?.isWindowOpen) user.isWindowOpen = false;
      }
    } else if (data?.close && data?.room?._id) {
      const index = this.chatWindow.findIndex(
        (window) => window?._id === data.room._id
      );
      if (index > -1) {
        this.chatWindow.splice(index, 1);
        const room = this.rooms.find((room) => room._id === data.room._id);
        if (room?.isWindowOpen) room.isWindowOpen = false;
      }
    } else if (data?.exit && data?.room?._id) {
      const index = this.chatWindow.findIndex(
        (window) => window?._id === data.room._id
      );
      if (index > -1) {
        this.chatWindow.splice(index, 1);
        const roomIndex = this.rooms.findIndex(
          (room) => room._id === data.room._id
        );
        this.chatWindow.splice(index, 1);
        if (roomIndex > -1) this.rooms.splice(roomIndex, 1);
      }
    }
  }

  getRooms() {
    this.socketService
      .getRooms(this.currentUserDetails?._id || '')
      .subscribe((res: any) => {
        this.rooms = res;
      });
  }

  checkNewRoom() {
    this.socketService.checkNewRoom().subscribe((room) => {
      this.rooms.push(room);
    });
  }
}
