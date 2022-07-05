import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../services/student/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnChanges {

  @Input() std?: Student;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  curStd: Student = {
    name: '',
    faculty: 1,
    gender: true,
    address : '',
  };

  message = '';
  constructor(private stdService: StudentService) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    this.curStd = { ...this.std };
  }
  updateGdr(status: boolean): void {
    if (this.curStd.id) {
      this.stdService.update(this.curStd.id, { gender: status })
      .then(() => {
        this.curStd.gender = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }
  updateStudent(): void {
    const data = {
      name: this.curStd.name,
      faculty: this.curStd.faculty,
      address: this.curStd.address
    };
    if (this.curStd.id) {
      this.stdService.update(this.curStd.id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }
  deleteTutorial(): void {
    if (this.curStd.id) {
      this.stdService.delete(this.curStd.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
