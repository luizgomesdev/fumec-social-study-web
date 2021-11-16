import { ClassScheduleService } from './../../../shared/services/class-schedule.service';
import { Classes } from 'src/app/shared/entities/classes.entity';
import { ClassesService } from './../../../shared/services/classes.service';
import { Semester } from 'src/app/shared/entities/semesters.entity';
import { SemesterService } from 'src/app/shared/services/semester.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddSemesterComponent } from 'src/app/components/forms/add-semester/add-semester.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClassSchedule } from 'src/app/shared/entities/class-schedule.entity';

@Component({
  selector: 'app-add-classe-schedule',
  templateUrl: './add-classe-schedule.component.html',
  styleUrls: ['./add-classe-schedule.component.scss'],
})
export class AddClasseScheduleComponent implements OnInit {
  formGroup!: FormGroup;
  semesterItems!: Semester[];
  semesterItem!: Semester;
  years!: (number | undefined)[];
  semesters!: (string | undefined)[];
  classes!: Classes[];

  constructor(
    private readonly semesterService: SemesterService,
    private readonly classesService: ClassesService,
    private readonly classScheduleService: ClassScheduleService,
    public dialogRef: MatDialogRef<AddClasseScheduleComponent>
  ) {}

  ngOnInit(): void {
    this.initForm({ year: '', semester: '', class: '', date: '' });

    this.semesterService.items.subscribe((items) => {
      // Pegando anos cadastrados
      this.years = items.map((item) => item.year);
      this.years = this.years.filter(
        (value, index) => this.years.indexOf(value) === index
      );

      this.formGroup.valueChanges.subscribe(({ year, semester }) => {
        // Pegando semestres existentes para aquele ano
        this.semesters = items
          .filter((item) => item.year === year)
          .map((item) => item.semester);

        this.semesters = this.semesters.filter(
          (value, index) => this.semesters.indexOf(value) === index
        );

        const semesterItem = items.find(
          (item) => item.year === year && item.semester === semester
        );

        if (semesterItem) {
          this.semesterItem = semesterItem;
          this.classesService
            .findAll(semesterItem.id)
            .then((data) => (this.classes = data));
        }
      });
    });
  }

  initForm(data: any) {
    this.formGroup = new FormGroup({
      year: new FormControl(data.year, [Validators.required]),
      semester: new FormControl(data.semester, [Validators.required]),
      class: new FormControl(data.classe, [Validators.required]),
      date: new FormControl(data.date, [Validators.required]),
    });
  }

  async create() {
    const data = this.formGroup.value;

    if (this.formGroup.valid) {
      await this.classScheduleService.create({
        classId: data.class,
        date: new Date(data.date),
        semesterId: this.semesterItem.id,
      });
      this.dialogRef.close();
    }
  }
}
