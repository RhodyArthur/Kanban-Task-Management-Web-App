import { Component, EventEmitter, Output } from '@angular/core';
import { MobileMenuComponent } from "../mobile-menu/mobile-menu.component";
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { Board } from '../../models/board';
import { boardState } from '../../state/board/board.entity';
import { selectSelectedBoard } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { AddEditBoardComponent } from "../modals/form/add-edit-board/add-edit-board.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MobileMenuComponent, CommonModule, MenuComponent, AddEditBoardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showMenu: boolean = false;
  selectedBoard$!: Observable<Board | null | undefined>;
  showForm: boolean = false;
  @Output() createBtnClicked = new EventEmitter<void>();
  
  constructor(private store: Store<boardState>) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }

  // display menu
  displayMenu() {
    this.showMenu = !this.showMenu;
  }

  editBoard() {
    console.log('display edit board')
  }

  deleteBoard() {
    console.log('display delete modal')
  }

  hideMenu() {
    this.showMenu = false;
  }

  // display board form
  displayBoardForm() {
    this.showForm = true;
  }

  // close form
  closeForm() {
    this.showForm = false;
  }

  onCreateBoard() {
    this.createBtnClicked.emit()
  }
}
