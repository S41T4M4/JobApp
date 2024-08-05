import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardRecrutadorComponent } from './components/dashboard-recrutador/dashboard-recrutador.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardRecrutadorComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,  // Declarar FormsModule
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
