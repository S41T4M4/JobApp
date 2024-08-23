
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-menu-vagas',
  templateUrl: './menu-vagas.component.html',
  styleUrl: './menu-vagas.component.scss'
})
export class MenuVagasComponent {
constructor(private router: Router) { }
logout(){
  if(window.confirm("U really want to do that ?")){
     localStorage.removeItem('token');
  this.router.navigate(['/login']);
  }
  console.log("Logout canceled");

}
perfilName: string = localStorage.getItem('nome')||'';
perfilType : string = localStorage.getItem('perfil')|| '';
getPerfil(){
  return localStorage.getItem('perfil')

}

}
