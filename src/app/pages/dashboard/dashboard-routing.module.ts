import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HorariosComponent } from './horarios/horarios.component';
import { MateriasComponent } from './materias/materias.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'materias',
    component: MateriasComponent,
    children: [{ path: ':id', component: MateriasComponent }],
  },
  {
    path: 'horarios',
    component: HorariosComponent,
    children: [{ path: ':id', component: HorariosComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
