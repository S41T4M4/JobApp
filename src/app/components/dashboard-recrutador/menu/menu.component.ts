import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isLogout: boolean = false;
  perfilName: string = localStorage.getItem('nome') || '';
  showAlert!: boolean;
  confirmLogout!: boolean;
  cancelLogout!: boolean;
 message = '';
  constructor(private router: Router) { }

  logout() {
    this.showAlert = true;
    this.message = 'Você tem certeza que deseja sair ?';
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
}
