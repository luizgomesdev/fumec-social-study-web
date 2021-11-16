import { Router } from '@angular/router';
import { AddSemesterComponent } from 'src/app/components/forms/add-semester/add-semester.component';
import { SemesterService } from 'src/app/shared/services/semester.service';
import { MatDialog } from '@angular/material/dialog';
import { Semester } from './../../../../shared/entities/semesters.entity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-semesters',
  templateUrl: './list-semesters.component.html',
  styleUrls: ['./list-semesters.component.scss'],
})
export class ListSemestersComponent implements OnInit {
  semesters!: Semester[];

  constructor(
    public dialog: MatDialog,
    private readonly semesterService: SemesterService,
    private readonly router: Router
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
    console.log(this.semesters);
    const ref = this.dialog.open(AddSemesterComponent);
    ref
      .afterClosed()
      .subscribe(
        async (result) => (this.semesters = await this.getSemesters())
      );
  }

  goToClasses(semesterId: string) {
    this.router.navigate(['/dashboard/materias', semesterId]);
  }
}
