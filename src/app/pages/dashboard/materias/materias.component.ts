import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  ParamMap,
  Router,
} from '@angular/router';
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
  semesterId!: string | null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.firstChild) {
          this.route.firstChild.paramMap.subscribe(
            (params: ParamMap) => (this.semesterId = params.get('id'))
          );
        } else {
          this.semesterId = null;
        }
      }
    });
  }
}
