import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../../services/api.service";
import { addBoard, addTask, deleteBoard, deleteTask, loadBoards, loadBoardsFailure, loadBoardsSuccess } from "./board.actions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Board } from "../../models/board";
import { v4 as uuidv4 } from 'uuid'
import { select, Store } from "@ngrx/store";
import { selectAllBoards } from "./board.selectors";
import { LocalStorageService } from "../../services/local-storage.service";

@Injectable()
export class BoardEffects {
    loadBoards$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadBoards),
        mergeMap(() => {
            const localStorageBoards = localStorage.getItem('boards');

            if(localStorageBoards) {
                const boards: Board[] = JSON.parse(localStorageBoards);
                return of(loadBoardsSuccess({boards}))
            }
            else {
                return this.apiService.getData().pipe(
                    map(res =>res.boards.map((board) => ({
                        ...board,
                        id: uuidv4()

                    }))),

                    tap((boards: Board[]) => {
                        localStorage.setItem('boards', JSON.stringify(boards))
                    }),
                    map((boards: Board[]) => loadBoardsSuccess({boards})),
                    catchError((error) =>{
                        console.error('Error loading boards:', error);
                        return of(loadBoardsFailure())
                    })
                )
            }
        })
    ))

    saveToLocalStorage$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(
              addBoard,
              deleteBoard,
              addTask,
              deleteTask,
            ),
            mergeMap(() =>
              this.store.pipe(
                select(selectAllBoards),
                tap((boards) =>
                  this.localStorageService.setItem('boards', boards)
                )
              )
            )
          ),
        { dispatch: false }
      );

    
    constructor( private actions$: Actions,
                 private apiService: ApiService,
                 private store: Store,
                 private localStorageService: LocalStorageService
    ){}
}
