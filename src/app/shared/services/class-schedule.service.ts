import { SemesterService } from 'src/app/shared/services/semester.service';
import { ClassesService } from './classes.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClassSchedule } from './../entities/class-schedule.entity';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClassScheduleService {
  private itemsCollection: AngularFirestoreCollection<ClassSchedule>;
  private userId: string;
  items: Observable<ClassSchedule[]>;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public classesService: ClassesService,
    public semesterService: SemesterService
  ) {
    this.itemsCollection = afs.collection<ClassSchedule>('class-schedule');
    this.items = this.itemsCollection.valueChanges();
    this.userId = this.authService.getCurrentUser().uid;
  }

  async create(data: Partial<ClassSchedule>) {
    const classSchedule = new ClassSchedule({
      ...data,
      id: uuid.v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: this.userId,
    });
    return this.itemsCollection.add({ ...classSchedule });
  }

  async findAll(): Promise<ClassSchedule[]> {
    const { docs } = await this.itemsCollection.ref
      .where('userId', '==', this.userId)
      .get();

    return Promise.all(
      docs.map(async (doc) => {
        const data = doc.data();
        const classe = await this.classesService.findOne(data.classId);
        const semester = await this.semesterService.findOne(data.semesterId);

        return {
          ...data,
          class: classe,
          semester,
        };
      })
    );
  }
}
