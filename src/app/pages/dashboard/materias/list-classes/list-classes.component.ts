import { AddClasseComponent } from './../../../../components/forms/add-classe/add-classe.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSemesterComponent } from 'src/app/components/forms/add-semester/add-semester.component';
import { Classes } from 'src/app/shared/entities/classes.entity';
import { SemesterService } from 'src/app/shared/services/semester.service';
import { Semester } from './../../../../shared/entities/semesters.entity';
import { ClassesService } from './../../../../shared/services/classes.service';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.scss'],
})
export class ListClassesComponent implements OnInit {
  @Input() semesterId!: string;
  semester!: Semester;
  classes!: Classes[];

  constructor(
    public dialog: MatDialog,
    private readonly semesterService: SemesterService,
    private readonly classesService: ClassesService
  ) {}

  ngOnInit(): void {
    (async () => {
      this.semester = (await this.getSemesterData()) ?? ({} as Semester);
      this.classes = await this.getClasses();
    })();
  }

  async getSemesterData() {
    return this.semesterService.findOne(this.semesterId);
  }
  async getClasses() {
    return this.classesService.findAll(this.semesterId);
  }

  openDialog() {
    const ref = this.dialog.open(AddClasseComponent, {
      data: { semesterId: this.semesterId },
    });
    ref.afterClosed().subscribe(async (result) => {
      this.classes = await this.getClasses();
    });
  }
}
