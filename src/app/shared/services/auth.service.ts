import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: firebase.User;

  constructor(
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);

      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  isLoggedIn() {
    return !!this.user;
  }
}
