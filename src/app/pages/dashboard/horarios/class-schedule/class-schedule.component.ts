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
  classesSchedule!: ClassSchedule[];

  constructor(
    public dialog: MatDialog,
    public classScheduleService: ClassScheduleService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.classesSchedule = await this.classScheduleService.findAll();
    console.log(this.classesSchedule);
  }

  getDate(date: any) {
    return format(date.seconds, "dd 'de' MMMM", { locale: ptBR });
  }

  getHour(date: any) {
    return format(date.seconds, "HH:mm", { locale: ptBR });
  }

  openDialog() {
    const ref = this.dialog.open(AddClasseScheduleComponent);
    ref.afterClosed().subscribe(async (result) => await this.init());
  }
}
