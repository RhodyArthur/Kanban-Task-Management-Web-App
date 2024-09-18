import { Component } from '@angular/core';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showMenu: boolean = false;

  // display menu
  displayMenu() {
    this.showMenu = !this.showMenu;
    console.log('icon clicked')
  }
}
