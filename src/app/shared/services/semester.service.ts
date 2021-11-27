import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Semester } from '../entities/semesters.entity';
import * as uuid from 'uuid';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  private itemsCollection: AngularFirestoreCollection<Semester>;
  items: Observable<Semester[]>;
  userId: string = this.authService.user.uid;

  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.itemsCollection = afs.collection<Semester>('semesters');
    this.items = this.itemsCollection.valueChanges();
  }

  async create(data: Partial<Semester>) {
    return this.itemsCollection.add({
      ...data,
      id: uuid.v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: this.authService.user.uid,
    });
  }

  async findOne(id: string): Promise<Semester> {
    const { docs } = await this.itemsCollection.ref
      .where('id', '==', id)
      .limit(1)
      .get();

    return docs[0].data() as Semester;
  }

  async findAll(): Promise<Semester[]> {
    const { docs } = await this.itemsCollection.ref
      .where('userId', '==', this.userId)
      .get();

    return docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
      };
    });
  }
}
