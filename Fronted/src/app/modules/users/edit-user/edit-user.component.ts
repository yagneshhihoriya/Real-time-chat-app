import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser, UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userDetails: IUser = {};
  userForm: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createUserForm();

    activatedRoute.params.subscribe((params: any) => {
      params['id'] === 'create' ? '' : this.getUserDetails(params['id']);
    });
  }

  ngOnInit(): void {}

  createUserForm() {
    this.userForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contact: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      name: ['', Validators.required],
      admin: [false],
    });
  }

  getUserDetails(id: string) {
    this.userId = id;
    this.userService.getUserById(this.userId).subscribe(
      (res: any) => {
        (this.userForm as FormGroup).patchValue(res);
      },
      (err) => {}
    );
  }

  saveHandler() {
    if (this.userForm.invalid) {
      return this.userForm.markAllAsTouched();
    }
    (this.userId
      ? this.userService.updateUser(this.userId, this.userForm.value)
      : this.userService.createUser(this.userForm.value)
    ).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res?.message || 'Success',
        }).then((res) => {
          history.back();
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: err?.error?.message || 'Something went wrong',
          text: 'Please try again',
        });
      }
    );
  }

  onCancel() {
    history.back();
  }

  getFormControlError(control: FormControl, validation: string = 'required') {
    return control?.errors && control.touched && control.errors[validation];
  }
}
