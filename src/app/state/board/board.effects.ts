import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../../services/api.service";
import { loadBoards, loadBoardsFailure, loadBoardsSuccess } from "./board.actions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Board } from "../../models/board";
import { v4 as uuidv4 } from 'uuid'

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
                    map(res =>res.map((board) => ({
                        ...board,
                        id: board.id || uuidv4()
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

    // loadBoards$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(loadBoards),
    //         mergeMap(() => {
    //             const localStorageBoards = localStorage.getItem('boards');
    
    //             if (localStorageBoards) {
    //                 const boards: Board[] = JSON.parse(localStorageBoards);
    //                 return of(loadBoardsSuccess({ boards }));
    //             } else {
    //                 return this.apiService.getData().pipe(
    //                     map(res => Array.isArray(res) ? res : [res]), // Ensure res is an array
    //                     map(res => res.map((board) => ({
    //                         ...board,
    //                         id: board.id || uuidv4()
    //                     }))),
    //                     tap((boards: Board[]) => {
    //                         console.log('Loading from API');
    //                         localStorage.setItem('boards', JSON.stringify(boards));
    //                     }),
    //                     map((boards: Board[]) => loadBoardsSuccess({ boards })),
    //                     catchError((error) => {
    //                         console.error('Error loading boards:', error);
    //                         return of(loadBoardsFailure());
    //                     })
    //                 );
    //             }
    //         })
    //     ));
    

    constructor( private actions$: Actions,
                 private apiService: ApiService
    ){}
}
