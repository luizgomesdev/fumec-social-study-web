import { Semester } from './../../../shared/entities/semesters.entity';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SemesterService } from 'src/app/shared/services/semester.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.scss'],
})
export class AddSemesterComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private readonly semesterService: SemesterService,
    public dialogRef: MatDialogRef<AddSemesterComponent>
  ) {}

  ngOnInit(): void {
    this.initForm({ year: '', semester: '' });
  }

  initForm(data: any) {
    this.formGroup = new FormGroup({
      year: new FormControl(data.year, [Validators.required]),
      semester: new FormControl(data.semester, [Validators.required]),
    });
  }

  async create() {
    const { year, semester } = this.formGroup.value;
    if (this.formGroup.valid) {
      await this.semesterService.create({ year, semester });
      this.dialogRef.close();
    }
  }
}
