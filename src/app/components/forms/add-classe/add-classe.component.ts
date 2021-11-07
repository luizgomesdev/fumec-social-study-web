import { ClassesService } from './../../../shared/services/classes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.scss'],
})
export class AddClasseComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private readonly classesService: ClassesService,
    public dialogRef: MatDialogRef<AddClasseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { semesterId: string }
  ) {}

  ngOnInit(): void {
    this.initForm({ className: '' });
  }

  initForm(data: any) {
    this.formGroup = new FormGroup({
      className: new FormControl(data.className, [Validators.required]),
    });
  }

  async create() {
    const { className } = this.formGroup.value;
    if (this.formGroup.valid) {
      await this.classesService.create({
        name: className,
        semesterId: this.data.semesterId,
      });
      this.dialogRef.close();
    }
  }
}
