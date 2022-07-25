import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [UsersComponent, EditUserComponent, UploadComponent],
  imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {}
