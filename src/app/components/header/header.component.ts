import { Component } from '@angular/core';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { Board } from '../../models/board';
import { boardState } from '../../state/board/board.entity';
import { selectSelectedBoard } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MobileMenuComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showMenu: boolean = false;
  selectedBoard$!: Observable<Board | null | undefined>;

  constructor(private store: Store<boardState>) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }

  // display menu
  displayMenu() {
    this.showMenu = !this.showMenu;
  }


}
