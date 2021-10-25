import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICredentials } from 'src/app/shared/interfaces/credentials.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.initForm({ email: '', password: '' });
  }

  initForm(credentials: ICredentials) {
    this.formGroup = new FormGroup({
      email: new FormControl(credentials.email, [Validators.required]),
      password: new FormControl(credentials.password, [Validators.required]),
    });
  }

  login() {
    const { email, password }: ICredentials = this.formGroup.value;
    if (this.formGroup.valid) this.authService.login(email, password);
  }
}
