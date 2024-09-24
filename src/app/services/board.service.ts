import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {BehaviorSubject, Observable, take} from 'rxjs';
import { Board } from '../models/board';
import {selectAllBoards, selectSelectedBoard} from '../state/board/board.selectors';
import { setSelectedBoard, updateBoard } from '../state/board/board.actions';
import {Task} from "../models/task";

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

    // update board
    updateBoard(board: Board) {
        this.store.dispatch(updateBoard({ board }));
        this.store.dispatch(setSelectedBoard({board}));
    }

    // update task
    updateTask(updatedTask: Task) {
        this.store
            .select(selectSelectedBoard)
            .pipe(take(1))
            .subscribe((board) => {
                if (board) {
                    const updatedBoard = {
                        ...board,
                        columns: board.columns.map((column) => ({
                            ...column,
                            tasks: column.tasks.map((task) =>
                                task.title === updatedTask.title ? updatedTask : task
                            ),
                        })),
                    };
                    this.updateBoard(updatedBoard);
                }
            });
    }
}
