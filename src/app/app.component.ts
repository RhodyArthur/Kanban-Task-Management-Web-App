import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from './models/board';
import { loadBoards } from './state/board/board.actions';
import { selectAllBoards, selectBoardState } from './state/board/board.selectors';
import { AddEditBoardComponent } from "./components/modals/form/add-edit-board/add-edit-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, AddEditBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kanban-task-manager';
  showForm: boolean = false;



  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  // display form
  displayForm() {
    this.showForm = true;
  }

  // close form
  closeForm() {
    this.showForm = false;
  }
}
