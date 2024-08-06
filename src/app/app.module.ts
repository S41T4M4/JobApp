import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardRecrutadorComponent } from './components/dashboard-recrutador/dashboard-recrutador.component';
import { DashboardCandidatoComponent } from './components/dashboard-candidato/dashboard-candidato.component';
import { AppRoutingModule } from './app-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardRecrutadorComponent,
    DashboardCandidatoComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
