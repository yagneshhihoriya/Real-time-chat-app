import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { IUser, UserService } from 'src/app/services/user.service';
import { IChatUser } from '../chat/chat.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input('user') chatUser: Partial<IChatUser> = {};
  @Output('close') closeEvent: EventEmitter<any> = new EventEmitter();
  expanded = true;
  messages: any[] = [];
  textBox = '';
  currentUser: Partial<IUser> = {};
  @ViewChild('messageContainer') private messageContainer: ElementRef | null =
    null;

  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUserDetails();
    this.subscribeMessage();
  }

  toggleWindow() {
    this.expanded = !this.expanded;
  }

  closeWindow() {
    this.closeEvent.emit({ close: true, user: this.chatUser });
  }

  onSend() {
    if (this.textBox?.trim()) {
      this.messages.push({
        message: this.textBox,
        sender: 'self',
      });
      this.socketService.sendMessage({
        to: this.chatUser.socketId,
        message: this.textBox,
        receiver: this.chatUser.id,
        sender: this.currentUser._id,
      });
      this.textBox = '';
    }
  }

  subscribeMessage() {
    this.socketService
      .getOlderMessages(this.chatUser.id || '', this.currentUser._id || '')
      .subscribe((res) => {

        this.messages = res as any[];
      });
    this.socketService.getMessages().subscribe((message: any) => {
      if (message.from === this.chatUser.socketId) this.messages.push(message);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      (this.messageContainer as ElementRef).nativeElement.scrollTop = (
        this.messageContainer as ElementRef
      ).nativeElement.scrollHeight;
    } catch (err) {}
  }
}
