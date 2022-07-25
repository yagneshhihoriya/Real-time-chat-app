import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RoomWindowComponent } from './components/room-window/room-window.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatWindowComponent,
    AddRoomComponent,
    RoomWindowComponent,
  ],
  imports: [
    NgSelectModule,
    SocketIoModule.forRoot({
      url: environment.apiUrl,
      options: {
        transports: ['websocket'],
        autoConnect: false,
      },
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
