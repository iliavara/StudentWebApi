import { Injectable } from '@angular/core';
import { StudentDetail } from './student-detail.model';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  constructor(private http:HttpClient) { }

  readonly baseURL = 'https://localhost:44350/api/StudentModel'

  formData:StudentDetail = new StudentDetail();
  list : StudentDetail[];
  
  postStudentDetail(){
    return this.http.post(this.baseURL,this.formData)
  }
  putStudentDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.Id}`, this.formData)
  }
  deleteStudentDetail(Id: number){
    return this.http.delete(`${this.baseURL}/${Id}`)
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res=>this.list = res as StudentDetail[]);
  }
}
