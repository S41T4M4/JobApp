import { RecrutadorGuard } from './_guard/recrutador.guard';
import { CandidatoGuard } from './_guard/candidato.guard';
import { AuthGuard } from './_guard/autorizado.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardRecrutadorComponent } from './components/dashboard-recrutador/dashboard-recrutador.component';
import { DashboardCandidatoComponent } from './components/dashboard-candidato/dashboard-candidato.component';
import { ManagementJobsComponent } from './components/dashboard-recrutador/management-jobs/management-jobs.component';
import { CandidatosEmVagasComponent } from './components/dashboard-recrutador/candidatos-em-vagas/candidatos-em-vagas.component';
import { VagasAplicadasComponent } from './components/dashboard-candidato/vagas-aplicadas/vagas-aplicadas.component';
import { ManagementJobsGuard } from './_guard/management-jobs.guard';
import { VagasAplicadasGuard } from './_guard/vagas-aplicadas.guard';
import { CandidatosVagaGuard } from './_guard/candidatos-em-vagas.guard';
import { WrongPageComponent } from './components/wrong-page/wrong-page.component';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-recrutador', component: DashboardRecrutadorComponent, canActivate: [AuthGuard, RecrutadorGuard] },
  { path: 'dashboard-candidato', component: DashboardCandidatoComponent, canActivate: [AuthGuard, CandidatoGuard] },
  { path: 'management-jobs', component: ManagementJobsComponent, canActivate: [AuthGuard, ManagementJobsGuard]},
  { path: 'candidatos-em-vagas/:id', component: CandidatosEmVagasComponent, canActivate: [AuthGuard, CandidatosVagaGuard]},
  { path : 'vagas-aplicadas', component : VagasAplicadasComponent, canActivate: [AuthGuard, VagasAplicadasGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'wrong-page', component : WrongPageComponent},
  { path: '**', redirectTo: '/wrong-page' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


