
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth.service';


@Component({
  selector: 'app-menu-vagas',
  templateUrl: './menu-vagas.component.html',
  styleUrl: './menu-vagas.component.scss'
})
export class MenuVagasComponent {
showAlert!: boolean;
confirmLogout!: boolean;
cancelLogout!: boolean;
message = '';

constructor(private router: Router , private authService: AuthService) { }
perfilName: string = localStorage.getItem('nome')||'';
perfilType : string = localStorage.getItem('perfil')|| '';
getPerfil(){
  return localStorage.getItem('perfil')
}
  logout() {
    const nome = localStorage.getItem('nome');

    this.showAlert = true;
    this.message = `Você tem certeza que deseja sair ${nome} ?`;
  }
  closeAlert() {
    this.showAlert = false;
  }

  performLogout() {
   if(this.confirmLogout = true){

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
   }
   else{
    this.cancelLogout = true;
   }
  }
  showNome(){
    const nome = localStorage.getItem('nome');
    this.showAlert = true;
    this.message = `${nome} `;
  }

}
