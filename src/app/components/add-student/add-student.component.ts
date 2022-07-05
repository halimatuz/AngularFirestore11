import { Component, OnInit } from '@angular/core';
import { Student } from '../../services/student/student.model';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  std: Student = new Student();
  submitted = false;
  constructor(private stdService: StudentService) { }
  ngOnInit(): void {
  }
  saveSTD(): void {
    this.stdService.createData(this.std).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }
  newSTD(): void {
    this.submitted = false;
    this.std = new Student();
  }

}
