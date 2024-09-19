import { createFeatureSelector, createSelector } from "@ngrx/store";
import { boardAdaptor, boardState } from "./board.entity";

export const  selectBoardState = createFeatureSelector<boardState>('boards');

export const { 
    selectAll: selectAllBoards,
    selectEntities: selectBoardEntities,
    selectTotal: selectBoardTotal,
    selectIds: selectBoardIds
 } = boardAdaptor.getSelectors(selectBoardState);

  
export const selectSelectedBoardId = createSelector(
    selectBoardState,
    (state: boardState) => state.selectedBoardId
);

export const selectSelectedBoard = createSelector(
    selectBoardState,
    selectSelectedBoardId,
    (state) => state.selectedBoard
)