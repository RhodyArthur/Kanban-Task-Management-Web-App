import { createAction, props } from "@ngrx/store";
import { Board } from "../../models/board";

export const loadBoards = createAction('[Board] Load Boards');

export const loadBoardsSuccess = createAction('[Board] Load Boards Success',
    props<{boards: Board[]}>()
);

export const loadBoardsFailure = createAction('[Board] Load Boards Failure');

export const addBoard = createAction('[Board] Add Board',
    props<{board: Board}>()
);

export const updateBoard = createAction('[Board] Update Board',
    props<{board: Board}>()
);

export const deleteBoard = createAction('[Board] Delete Board',
    props<{id: string}>()
);

export const setSelectedBoard = createAction('[Board] Set Selected Board',
    props<{board: Board}>()
);