import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  uploadURL = environment.uploadAPIUrl;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res?.users;
      },
      (err) => {}
    );
  }

  deleteHandler(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sire you want to delete this user?',
      text: 'This operation can not be reverted!',
      confirmButtonText: 'Yes',
      cancelButtonAriaLabel: 'Cancel',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (res: any) => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Successfully deleted user',
              });
              this.getAllUsers();
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: 'Please try again'
            });
          }
        );
      }
    });
  }

  editUserHandler(id: string) {
    this.router.navigate(['/users', id]);
  }

  uploadUserHandler(id: string) {
    this.router.navigate(['/users/upload', id]);
  }
}
