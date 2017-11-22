import { Pipe, PipeTransform } from '@angular/core';
import {Student} from '../models/student.model';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(students: Student[], searchTerm: string): any {
    if(!searchTerm){
      return students;
    } else {
      students = students.filter(
        (student) => {
          let sname = student.sname.toLowerCase();
          let cname = student.cname.toLowerCase();
          return ((sname.indexOf(searchTerm)!== -1) || (cname.indexOf(searchTerm)!==-1))
        }
      )
      return students;
    }
  }

}
