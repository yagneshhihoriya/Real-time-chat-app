import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  inprogress = false;
  progress = 0;
  file: any;
  userId = '';
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {}

  handleFile(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    if (!this.file) {
      Swal.fire({
        title: 'Please choose a file!',
      });
      return;
    }
    this.inprogress = true;
    let formData = new FormData();
    formData.append('file', this.file);
    this.userService
      .uploadUserDoc(this.userId, formData)
      .subscribe((res: any) => {
        if (res.type === 1 && res.loaded && res.total) {
          this.progress = (res.loaded / res.total) * 100;
        } else if (res.type === 4) {
          this.progress = 100;
          Swal.fire({
            title: 'File upload completed',
            text: 'Successfully uploaded file',
          }).then((res) => {
            history.back();
            this.file = null;
            this.progress = 0;
            this.inprogress = false;
          });
        }
      });
  }
}
