import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUser {
  _id?: string;
  email?: string;
  document?: string;
  name?: string;
  password?: string;
  contact?: string;
  admin?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = new BehaviorSubject(false);
  private readonly baseUrl: string = `${environment.apiUrl}/users`;
  private readonly uploadBaseUrl: string = `${environment.uploadAPIUrl}/users`;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('u') || '{}');
    if (user?.token) {
      this.isLoggedIn.next(true);
    }
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }
  login(data: IUser) {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        // if (res?.success)
        {
          localStorage.setItem('u', JSON.stringify(res));
          this.isLoggedIn.next(true);
        }
      })
    );
  }

  getAllUsers() {
    console.log(this.baseUrl)
    return this.http.get(`${this.baseUrl}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getUserById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  uploadUserDoc(id: string, data: any) {
    return this.http.post(`${this.uploadBaseUrl}/upload/${id}`, data, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem('u') || '{}');
  }
}
