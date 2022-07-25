import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    if (userService.isLoggedIn) {
      // history.back();
      this.router.navigateByUrl('/users')
    }
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }
    let data = this.loginForm.value;
    this.userService.login(data).subscribe(
      (res: any) => {
        if (res?.success) {
          Swal.fire({
            timer: 1000,
            icon: 'success',
            title: 'Successfully logged in!',
          }).then((res) => {
            this.router.navigateByUrl('/users');
          });
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error?.message || 'Something went wrong!',
          text: 'Try again with correct user details',
        });
      }
    );
  }

  ngOnInit(): void {}

  getFormControlError(control: FormGroup) {
    return control?.touched && control?.errors && control?.errors['required'];
  }
}
