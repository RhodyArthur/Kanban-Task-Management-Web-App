import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from '../../models/board';
import { boardState } from '../../state/board/board.entity';
import { selectSelectedBoard } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TaskComponent } from "./task/task.component";
import { Task } from '../../models/task';
import { AddEditBoardComponent } from "../modals/form/add-edit-board/add-edit-board.component";
import {generateRandomColor} from "../../utils/color";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskComponent, AddEditBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements  OnInit{

  selectedBoard$!: Observable<Board | null | undefined>;
  showForm: boolean = false;
  @Output() newColumnClicked = new EventEmitter<void>();
  colors: string[] = []

  constructor(private store: Store<boardState>,
              private boardService: BoardService
  ) {}

  ngOnInit() {
      this.selectedBoard$ = this.store.select(selectSelectedBoard);
      this.selectedBoard$.subscribe(
          data => {data?.columns.forEach(column => this.colors.push(generateRandomColor()))
          }
      )
}

// add new column
// display edit board
addNewColumn() {
  this.showForm = true;
}

onAddNewColumnClicked() {
  this.newColumnClicked.emit();
}

// hide modal
hideModal() {
  this.showForm = false;
}
}
