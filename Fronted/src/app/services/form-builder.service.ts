import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IForm {
  _id: string;
  title: string;
  form: {
    label: string;
    labelView: string;
    name: string;
    placeholder: string;
    type: string;
    controls: {
      label: string;
      value: string;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  baseURL = `${environment.apiUrl}/form-builder`;

  constructor(private http: HttpClient) {}

  getAllForms() {
    return this.http.get(`${this.baseURL}/`);
  }

  createForm(data: any) {
    return this.http.post(`${this.baseURL}/`, data);
  }

  updateForm(data: any, id: string) {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  deleteForm(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getForm(id: any) {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  submitForm(data: any) {
    return this.http.post(`${this.baseURL}/submit/`, data);
  }
}
