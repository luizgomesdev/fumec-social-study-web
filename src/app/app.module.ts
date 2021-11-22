import { NgModule } from '@angular/core';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddClasseComponent } from './components/forms/add-classe/add-classe.component';
import { AddSemesterComponent } from './components/forms/add-semester/add-semester.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HorariosComponent } from './pages/dashboard/horarios/horarios.component';
import { InicioComponent } from './pages/dashboard/inicio/inicio.component';
import { ListClassesComponent } from './pages/dashboard/materias/list-classes/list-classes.component';
import { ListSemestersComponent } from './pages/dashboard/materias/list-semesters/list-semesters.component';
import { MateriasComponent } from './pages/dashboard/materias/materias.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { ClassScheduleComponent } from './pages/dashboard/horarios/class-schedule/class-schedule.component';
import { AddClasseScheduleComponent } from './components/forms/add-classe-schedule/add-classe-schedule.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent,
    SidebarComponent,
    MateriasComponent,
    InicioComponent,
    AddSemesterComponent,
    ListClassesComponent,
    ListSemestersComponent,
    AddClasseComponent,
    HorariosComponent,
    ClassScheduleComponent,
    AddClasseScheduleComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
