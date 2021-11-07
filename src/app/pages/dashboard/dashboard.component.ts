import { AuthService } from 'src/app/shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  menuActive: string = 'materias';
  currentUser!: any;

  ngOnInit(): void {
    // (async () => {
    //   this.currentUser = await this.authService.curentUser();
    //   console.log(await this.authService.curentUser());
    // })();
  }

  setMenuActive(value: string) {
    this.menuActive = value;
  }
}
