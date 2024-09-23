import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeComponent } from "../theme/theme.component";
import {  Observable } from 'rxjs';
import { Board } from '../../models/board';
import { loadBoards, setSelectedBoard } from '../../state/board/board.actions';
import { selectAllBoards, selectSelectedBoard } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { Store } from '@ngrx/store';
import { boardState } from '../../state/board/board.entity';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  boards$!: Observable<Board[]>;
  showSidebar: boolean = true;
  @Output() createBtnClicked = new EventEmitter<void>();
  @Output() hideEvent = new EventEmitter<void>();


  constructor(private boardService: BoardService,
              private store: Store<boardState>) {}

  ngOnInit() {
   this.boards$ = this.boardService.boards$;
  }

  hideSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  selectedBoard$ = this.store.select(selectSelectedBoard);

  onBoardSelect(board: Board) {
    this.boardService.saveSelectedBoard(board);
  }

  // display create form modal
  onCreateBtnClicked() {
    console.log('display form')
    this.createBtnClicked.emit();
  }

}
