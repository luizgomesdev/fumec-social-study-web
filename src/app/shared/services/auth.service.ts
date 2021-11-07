import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {}

  async login(email: string, password: string) {
    try {
      const credentials = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );

      localStorage.setItem('@ss:credential', JSON.stringify(credentials.user));
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  async signUp(email: string, password: string) {
    try {
      const credentials = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem('@ss:credential', JSON.stringify(credentials.user));
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem('@ss:credential');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem('@ss:credential');
  }
}
