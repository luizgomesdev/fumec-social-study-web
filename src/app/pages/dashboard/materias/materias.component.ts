import { SemesterService } from 'src/app/shared/services/semester.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddSemesterComponent } from 'src/app/components/forms/add-semester/add-semester.component';
import { Semester } from 'src/app/shared/entities/semesters.entity';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
})
export class MateriasComponent implements OnInit {
  semesters!: Semester[];

  constructor(
    public dialog: MatDialog,
    private readonly semesterService: SemesterService
  ) {}

  ngOnInit(): void {
    (async () => {
      this.semesters = await this.getSemesters();
    })();
  }

  async getSemesters() {
    return this.semesterService.findAll();
  }

  openDialog() {
    const ref = this.dialog.open(AddSemesterComponent);
    ref
      .afterClosed()
      .subscribe(
        async (result) => (this.semesters = await this.getSemesters())
      );
  }
}
