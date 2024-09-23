import { createAction, props } from "@ngrx/store";
import { Board } from "../../models/board";
import { Task } from "../../models/task";

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

export const clearSelectedBoard = createAction('[Board] Clear Selected Board');

export const moveTaskInColumn = createAction(
    '[Board] Move Task In Column',
    props<{ columnId: string; previousIndex: number; currentIndex: number }>()
);

// task actions
export const addTask = createAction(
    '[Board] Add Task',
    props<{ boardId: string;
            columnName: string;
            task: Task }>()
);

export const updateTask = createAction(
    '[Board] Update Task',
    props<{ boardId: string;
            columnName: string;
            task: Task }>()
);

export const deleteTask = createAction(
    '[Board] Delete Task',
    props<{ boardId: string; columnName: string; taskId: string }>()
);

export const moveTask = createAction(
    '[Board] Move Task',
    props<{
        boardId: string;
        sourceColumn: string;
        targetColumn: string;
        taskId: string;
    }>()
);
