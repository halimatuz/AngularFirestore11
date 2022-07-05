import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private dbPath = '/student-tb';
  SRef: AngularFirestoreCollection<Student>;
  constructor(private db: AngularFirestore) {
    this.SRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Student> {
    return this.SRef;
  }
  createData(std: Student): any {
    return this.SRef.add({ ...std });
  }
  update(id: string, data: any): Promise<void> {
    return this.SRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.SRef.doc(id).delete();
  }
}
