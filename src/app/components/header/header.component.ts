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
import {AddEditTaskComponent} from "../modals/form/add-edit-task/add-edit-task.component";
import {DeleteModalComponent} from "../modals/delete-modal/delete-modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [MobileMenuComponent, CommonModule, MenuComponent, AddEditBoardComponent, AddEditTaskComponent, DeleteModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showMenu: boolean = false;
  selectedBoard$!: Observable<Board | null | undefined>;
  showForm: boolean = false;
  @Output() createBtnClicked = new EventEmitter<void>();
  showTaskForm: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private store: Store<boardState>) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }

  // display menu
  displayMenu() {
    this.showMenu = !this.showMenu;
  }

  // display delete modal
  deleteBoard() {
    this.showDeleteModal = true;
  }

  // close menu
  hideMenu() {
    this.showMenu = false;
  }

  // display board form
  displayBoardForm() {
    this.showForm = true;
  }

  // close board form
  closeForm() {
    this.showForm = false;
  }

  closeDeleteModal(): void {
      this.showDeleteModal = false;
  }

  onCreateBoard() {
    this.createBtnClicked.emit()
  }

  // display task form
  displayTaskForm():void {
    this.showTaskForm = true;
  }

  closeTaskForm():void {
      this.showTaskForm = false;
  }
}
