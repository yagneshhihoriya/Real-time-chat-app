import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  @Input('creator') user: IUser | null = null;
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  users: any[] = [];
  selectedUsers: any[] = [];
  roomName: string = '';

  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onCloseHandled() {
    this.closeEvent.emit({
      close: true,
      save: false,
    });
  }

  onSave() {
    if (this.roomName) {
      this.socketService
        .createRoom({
          name: this.roomName,
          createdBy: this.user?._id,
          members: this.selectedUsers,
        })
        .subscribe((res) => {
          this.closeEvent.emit({
            save: true,
            close: true,
          });
        });
    }
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res.users;
    });
  }
}
