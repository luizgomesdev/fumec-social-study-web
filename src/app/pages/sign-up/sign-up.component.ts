import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICredentials } from 'src/app/shared/interfaces/credentials.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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

  signUp() {
    const { email, password }: ICredentials = this.formGroup.value;
    if (this.formGroup.valid) this.authService.signUp(email, password);
  }
}
