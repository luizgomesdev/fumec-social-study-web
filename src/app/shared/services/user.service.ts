import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(public authService: AuthService, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('users');
    this.items = this.itemsCollection.valueChanges();
  }

  async get() {
    const { displayName, email, phoneNumber, photoURL, uid } =
      this.authService.user;
    const doc = await this.findOne(this.authService.user.uid);
    return { data: doc?.data(), displayName, email, phoneNumber, photoURL, uid };
  }

  async updateEmail(email: string) {
    return this.authService.user.updateEmail(email);
  }

  async updateProfile(data: Partial<firebase.User>) {
    return this.authService.user.updateProfile(data);
  }

  async upSert(data: any) {
    const doc = await this.findOne(this.authService.user.uid);

    doc?.data()
      ? this.itemsCollection.doc(doc.id).update(data)
      : this.itemsCollection.add({
          ...data,
          id: uuid.v4(),
          userId: this.authService.user.uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
  }

  async findOne(id: string) {
    const { docs } = await this.itemsCollection.ref
      .where('userId', '==', id)
      .limit(1)
      .get();

    return docs[0]?.data() ? docs[0] : null;
  }

  async updatePassword(password: string) {
    return this.authService.user.updatePassword(password);
  }
}
