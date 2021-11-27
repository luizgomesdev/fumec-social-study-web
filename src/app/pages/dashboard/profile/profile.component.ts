import { UserService } from './../../../shared/services/user.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formGroup!: FormGroup;
  displayName!: string | null;
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.initForm({
      displayName: '',
      course: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
    this.getUserData();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  initForm(data: any) {
    this.formGroup = new FormGroup(
      {
        email: new FormControl(data.email, [Validators.required]),
        displayName: new FormControl(data.displayName, [Validators.required]),
        phoneNumber: new FormControl(data.phoneNumber, [Validators.required]),
        course: new FormControl(data.course, [Validators.required]),
        password: new FormControl(data.password),
        confirmPassword: new FormControl(data.confirmPassword),
      },
      { validators: this.checkPasswords }
    );
  }

  async getUserData() {
    const { data, ...user } = await this.userService.get();
    this.displayName = user.displayName;
    this.formGroup.patchValue({ ...user, ...data });
  }
  async update() {
    const {
      email,
      displayName,
      phoneNumber,
      course,
      password,
      confirmPassword,
    } = this.formGroup.value;
    if (this.formGroup.valid) {
      await this.userService.updateEmail(email);
      await this.userService.updateProfile({ displayName });
      await this.userService.upSert({ course, phoneNumber });
      if (password && confirmPassword) {
        await this.userService.updatePassword(password);
      }
      await this.getUserData();
    }
  }
}
