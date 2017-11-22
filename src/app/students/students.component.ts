import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../models/student.model';
import {Response} from '@angular/http';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students:Student[];
  searchTerm: string;
  editMode : boolean = false;
  studentsChanged = new Subject<Student[]>();
  editSid : number;
  editCid : number;
  index : number;
  showError = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (data) =>{
        this.students = data.json();
      }
    );
  }
  onDelete(index:number){
    let sid: number = this.students[index].sid;
    let cid: number = this.students[index].cid;
    this.studentService.deleteStudent(sid, cid).subscribe(
      (res:Response) => {
        console.log(res.json());
        if(res.json().affectedRows){
          this.students.splice(index, 1);
        }
      }
    )
  }

  onEditSubmit(values){
    let leaglToChange = true;
    let newCId : number;
    if(values.course === 'math'){
      newCId = 1;
    } else {
      newCId = 2;
    }
    console.log(newCId);
    console.log(this.editSid);

    if(leaglToChange){
      this.studentService.editStudent(values, this.editSid, this.editCid).subscribe(
        (res: Response) => {
          if(res){
            this.studentService.getStudents().subscribe(
              (data) =>{
                this.students = data.json();
              }
            );
          }
        },
        (err) => {
          this.showError = true;
          console.log(err);
        }
      );
    }
  }

  onSearch(term){
    this.searchTerm = term;
  }

  onEdit(index: number){
    this.editSid = this.students[index].sid;
    this.editCid = this.students[index].cid;
    this.editMode = !this.editMode;
    this.index = index;
  }

  onAdd(form:NgForm){
    let values = form.value;

    this.studentService.addStudent(values).subscribe(
      (res:Response) => {
        let sid = res.json().insertId;
        let sname : string;
        this.students.forEach(
          (student) => {
            if(student.sid === sid){
              sname = student.sname;
            }
          }
        )
        if(sid){
          let name = values.name;

          let math = values.math;
          let data = values.dataStructure;
          if(math){
            let student: Student = new Student(sid, name, 'math', 1);
            this.students.push(student);
          }
          if(data){
            let student: Student = new Student(sid, name, 'data structure', 2);
            this.students.push(student);
          }
        }
        console.log(this.students);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
