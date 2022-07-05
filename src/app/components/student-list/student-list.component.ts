import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { map } from 'rxjs/operators';
import { Student } from '../../services/student/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  stdst?: Student[];
  curStd?: Student;
  currentIndex = -1;
  title = '';
  constructor(private stdServicesr: StudentService) { }
  ngOnInit(): void {
    this.AmbilStudent();
  }

  refreshList(): void {
    this.curStd = undefined;
    this.currentIndex = -1;
    this.AmbilStudent();
  }

  AmbilStudent(): void {
    this.stdServicesr.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.stdst = data;
    });
  }

  setActiveSTD(std: Student, index: number): void {
    this.curStd = std;
    this.currentIndex = index;
  }

}
