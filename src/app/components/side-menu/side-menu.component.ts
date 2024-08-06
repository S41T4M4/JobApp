import { Component } from '@angular/core';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}





