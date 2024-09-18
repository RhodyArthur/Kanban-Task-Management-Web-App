import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../models/board';
import { selectAllBoards } from '../state/board/board.selectors';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boards$!: Observable<Board[]>;

  constructor(private store: Store) {
    this.boards$ = this.store.pipe(select(selectAllBoards));
  }

}
