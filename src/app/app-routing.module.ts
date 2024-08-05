import { NgModule } from '@angular/core';
import { RouterModule, Routes,RouterOutlet} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardRecrutadorComponent } from './components/dashboard-recrutador/dashboard-recrutador.component';

const routes: Routes = [
  { path: 'dashboard-recrutador', component: DashboardRecrutadorComponent },
  { path: '', redirectTo: '/dashboard-recrutador', pathMatch: 'full' },
  // outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
