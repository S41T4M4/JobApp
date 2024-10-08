import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardRecrutadorComponent } from './components/dashboard-recrutador/dashboard-recrutador.component';
import { DashboardCandidatoComponent } from './components/dashboard-candidato/dashboard-candidato.component';
import { AppRoutingModule } from './app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCommonModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MenuComponent } from './components/dashboard-recrutador/menu/menu.component';
import { ManagementJobsComponent } from './components/dashboard-recrutador/management-jobs/management-jobs.component';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CandidatosEmVagasComponent } from './components/dashboard-recrutador/candidatos-em-vagas/candidatos-em-vagas.component';
import { MenuVagasComponent } from './components/dashboard-candidato/menu-vagas/menu-vagas.component';
import { MatIconModule } from '@angular/material/icon';
import { VagasAplicadasComponent } from './components/dashboard-candidato/vagas-aplicadas/vagas-aplicadas.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { WrongPageComponent } from './components/wrong-page/wrong-page.component';
import { StatusPipe } from './pipes/status.pipe';
import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardRecrutadorComponent,
    DashboardCandidatoComponent,
    MenuComponent,
    ManagementJobsComponent,
    CandidatosEmVagasComponent,
    MenuVagasComponent,
    VagasAplicadasComponent,
    WrongPageComponent,
    StatusPipe,
    AlertComponent,
    DialogComponent



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCommonModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
