import { Classes } from './../entities/classes.entity';
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
export class ClassesService {
  private itemsCollection: AngularFirestoreCollection<Classes>;
  items: Observable<Classes[]>;

  constructor(private afs: AngularFirestore, public authService: AuthService) {
    this.itemsCollection = afs.collection<Classes>('classes');
    this.items = this.itemsCollection.valueChanges();
  }

  async create(data: Partial<Classes>) {
    return this.itemsCollection.add({
      ...data,
      id: uuid.v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findOne(id: string): Promise<Classes | null> {
    const { data } = await this.itemsCollection.doc(id).ref.get();
    return data() ?? null;
  }

  async findAll(semesterId: string): Promise<Classes[]> {
    const { docs } = await this.itemsCollection.ref
      .where('semesterId', '==', semesterId)
      .get();

    return docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
      };
    });
  }
}
