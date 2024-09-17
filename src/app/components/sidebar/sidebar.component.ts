import { Component } from '@angular/core';
import { ThemeComponent } from "../theme/theme.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
