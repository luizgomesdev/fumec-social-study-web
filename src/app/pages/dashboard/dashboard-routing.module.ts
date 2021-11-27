import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosComponent } from './horarios/horarios.component';
import { MateriasComponent } from './materias/materias.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HorariosComponent },
  {
    path: 'materias',
    component: MateriasComponent,
    children: [{ path: ':id', component: MateriasComponent }],
  },
  {
    path: 'perfil',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
