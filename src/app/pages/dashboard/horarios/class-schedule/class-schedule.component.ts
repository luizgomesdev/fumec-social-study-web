import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from './../../../../shared/services/user.service';
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
  displayName!: string | null;

  constructor(
    public dialog: MatDialog,
    public classScheduleService: ClassScheduleService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm({ selectedSemesterId: '' });
    this.displayName = this.authService.user.displayName;
    this.initData();
  }

  async initData() {
    this.classesSchedule = await this.classScheduleService.findAll();
    this.classesSchedule.sort(
      ({ date: ADate }: any, { date: BDate }: any) =>
        BDate.toDate() - ADate.toDate()
    );

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

  async updateData() {
    this.semesters = [];
    this.classesSchedule = await this.classScheduleService.findAll();
    this.classesSchedule.sort(
      ({ date: ADate }: any, { date: BDate }: any) =>
        BDate.toDate() - ADate.toDate()
    );

    for (const classSchedule of this.classesSchedule) {
      if (classSchedule.semester) {
        const index = this.semesters.findIndex(
          (value) => value.id === classSchedule.semester?.id
        );
        if (index == -1) this.semesters.push(classSchedule.semester);
      }
    }

    this.classes = this.classesSchedule.filter(
      (data) =>
        data.semester?.id === this.formGroup.get('selectedSemesterId')?.value
    );
  }

  getDate(date: any) {
    return format(date.toDate(), "dd 'de' MMMM", { locale: ptBR });
  }

  getHour(date: any) {
    return format(date.toDate(), 'HH:mm', { locale: ptBR });
  }

  openDialog() {
    const ref = this.dialog.open(AddClasseScheduleComponent);
    ref.afterClosed().subscribe(async (result) => await this.updateData());
  }
}
