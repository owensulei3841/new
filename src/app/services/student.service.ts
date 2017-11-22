import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {
  studentChanged = new Subject<Student[]>();
  students: Student[];

  constructor(private http: Http) { }
  private url = 'http://localhost:1337';

  getStudents() {
    return this.http.get(this.url);
  }

  getStudent(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  addStudent(info: any) {
    console.log(info);
    return this.http.post(this.url, info);
  }

  editStudent(info: any, sid:number, cid:number) {
    return this.http.put(this.url + `/${sid}/${cid}` , info);
  }

  deleteStudent(id: number, cid: number) {
    return this.http.delete(this.url + '/' + id + '/' + cid);
  }
}
