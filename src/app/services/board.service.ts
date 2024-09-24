import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject,  Observable } from 'rxjs';
import { Board } from '../models/board';
import { selectAllBoards } from '../state/board/board.selectors';
import { setSelectedBoard } from '../state/board/board.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boards$!: Observable<Board[]>;
  selectedBoard = new BehaviorSubject<Board | null | undefined>(null);

  constructor(private store: Store) {
    this.boards$ = this.store.pipe(select(selectAllBoards));
  }

  // save to local storage
  saveSelectedBoard(board: Board) {
    localStorage.setItem('selectedBoard',JSON.stringify(board))
    this.selectedBoard.next(JSON.parse(localStorage.getItem('selectedBoard')!));
    this.store.dispatch(setSelectedBoard({board}));
  }

}
