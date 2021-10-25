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
    const credentials = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    localStorage.setItem(
      '@ss:credential',
      JSON.stringify(credentials.credential)
    );
  }

  async signUp(email: string, password: string) {
    const credentials = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(credentials);
    localStorage.setItem(
      '@ss:credential',
      JSON.stringify(credentials.credential)
    );
    this.router.navigate(['dashboard']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('@ss:credential');
  }
}
