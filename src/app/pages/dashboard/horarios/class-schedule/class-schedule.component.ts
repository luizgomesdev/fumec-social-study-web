import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Semester } from 'src/app/shared/entities/semesters.entity';
import { ClassSchedule } from 'src/app/shared/entities/class-schedule.entity';
import { ClassScheduleService } from './../../../../shared/services/class-schedule.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddClasseScheduleComponent } from './../../../../components/forms/add-classe-schedule/add-classe-schedule.component';
import { format, Locale } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss'],
})
export class ClassScheduleComponent implements OnInit {
  formGroup!: FormGroup;
  classesSchedule!: ClassSchedule[];
  classes!: ClassSchedule[];
  semesters: Semester[] = [];

  constructor(
    public dialog: MatDialog,
    public classScheduleService: ClassScheduleService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.initForm({ selectedSemesterId: '' });

    this.classesSchedule = await this.classScheduleService.findAll();

    for (const classSchedule of this.classesSchedule) {
      if (classSchedule.semester) {
        const index = this.semesters.findIndex(
          (value) => value.id === classSchedule.semester?.id
        );
        if (index == -1) this.semesters.push(classSchedule.semester);
      }
    }

    this.formGroup
      .get('selectedSemesterId')
      ?.valueChanges.subscribe(async (value) => {
        console.log(value)
        this.classes = this.classesSchedule.filter(
          (data) => data.semester?.id === value
        );
      });
  }

  initForm(data: any) {
    this.formGroup = new FormGroup({
      selectedSemesterId: new FormControl(data.selectedSemesterId, [
        Validators.required,
      ]),
    });
  }

  getDate(date: any) {
    return format(date.seconds, "dd 'de' MMMM", { locale: ptBR });
  }

  getHour(date: any) {
    return format(date.seconds, 'HH:mm', { locale: ptBR });
  }

  openDialog() {
    const ref = this.dialog.open(AddClasseScheduleComponent);
    ref.afterClosed().subscribe(async (result) => await this.init());
  }
}
