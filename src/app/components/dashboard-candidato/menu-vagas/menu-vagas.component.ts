import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-vagas',
  templateUrl: './menu-vagas.component.html',
  styleUrl: './menu-vagas.component.css'
})
export class MenuVagasComponent {
 menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
