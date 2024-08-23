import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
constructor(private router: Router) { }

perfilName: string = localStorage.getItem('nome')||'';


logout(){
  if(window.confirm("U really want to do that ?")){
     localStorage.removeItem('token');
  this.router.navigate(['/login']);
  }
  console.log("Logout canceled");

}
}
