import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private socketService: SocketService
  ) {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) socketService.setStatus();
      else socketService.disconnect();
    });
  }
  title = 'demo-angular';

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
