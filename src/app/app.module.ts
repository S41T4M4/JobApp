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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardRecrutadorComponent,
    DashboardCandidatoComponent,
    MenuComponent,
    ManagementJobsComponent,

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
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
