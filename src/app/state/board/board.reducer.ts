import { createReducer, on } from "@ngrx/store";
import { boardAdaptor, initialBoardState } from "./board.entity";
import {
    addBoard, addTask,
    clearSelectedBoard,
    deleteBoard,
    deleteTask,
    loadBoards,
    loadBoardsFailure,
    loadBoardsSuccess, moveTask,
    setSelectedBoard,
    updateBoard, updateTask
} from "./board.actions";

export const boardReducer = createReducer(
    initialBoardState,

    on(loadBoards, (state) => ({...state, loading:true})),
    on(loadBoardsSuccess, (state, {boards}) => boardAdaptor.setAll(boards, {...state, loading:false})),
    on(loadBoardsFailure, (state) => ({...state, loading:false})),
    on(addBoard, (state, {board}) => boardAdaptor.addOne(board, {...state})),
    on(updateBoard, (state, {board}) => boardAdaptor.updateOne({id: board.id, changes:board}, state)),
    on(deleteBoard, (state, {id}) => boardAdaptor.removeOne(id, state)),
    on(setSelectedBoard, (state, {board}) => ({...state, selectedBoard: board})),
    on(clearSelectedBoard, (state) => ({...state, selectedBoard: null})),

    // task
    on(addTask, (state, { boardId, columnName, task }) => {
        const board = state.entities[boardId];

        if (!board) return state;

        const updatedColumns = board.columns.map((column) =>
            column.name === columnName ? {...column, tasks: [...column.tasks, task]} : column
        );

        const updatedBoard = {
            ...board,
            columns: updatedColumns,
        };

        return boardAdaptor.updateOne(
            { id: boardId, changes: updatedBoard },
            state
        );
    }),

    on(updateTask, (state, { boardId, columnName, task }) => {
        const board = state.entities[boardId];
        if (!board) return state;

        const updatedColumns = board.columns.map((column) =>
            column.name === columnName
                ? {
                    ...column,
                    tasks: column.tasks.map((t) => (t.title === task.title ? task : t)),
                }
                : column
        );

        const updatedBoard = {
            ...board,
            columns: updatedColumns,
        };

        return boardAdaptor.updateOne(
            { id: board.id, changes: updatedBoard },
            state
        );
    }),

    // delete task
    on(deleteTask, (state, { boardId, columnName, taskId }) => {
        const board = state.entities[boardId];
    
        if (!board) return state;
    
        const updatedColumns = board.columns.map((column) => {
          if (column.name === columnName) {
            const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
            return {
              ...column,
              tasks: updatedTasks,
            };
          }
          return column;
        });
    
        const updatedBoard = {
          ...board,
          columns: updatedColumns,
        };
    
        return boardAdaptor.updateOne(
          { id: boardId, changes: updatedBoard },
          state
        );
      }),


    // Move task between columns
    on(
        moveTask,
        (state, { boardId, sourceColumn, targetColumn, taskId }) => {
            const board = state.entities[boardId];
            if (!board) return state;

            const sourceCol = board.columns.find((col) => col.name === sourceColumn);
            const targetCol = board.columns.find((col) => col.name === targetColumn);
            if (!sourceCol || !targetCol) return state;

            const taskToMove = sourceCol.tasks.find((task) => task.title === taskId);
            if (!taskToMove) return state;

            const updatedSourceColumn = {
                ...sourceCol,
                tasks: sourceCol.tasks.filter((task) => task.title !== taskId),
            };

            const updatedTargetColumn = {
                ...targetCol,
                tasks: [...targetCol.tasks, taskToMove],
            };

            const updatedColumns = board.columns.map((col) =>
                col.name === sourceColumn
                    ? updatedSourceColumn
                    : col.name === targetColumn
                        ? updatedTargetColumn
                        : col
            );

            const updatedBoard = {
                ...board,
                columns: updatedColumns,
            };

            return boardAdaptor.updateOne(
                { id: board.id, changes: updatedBoard },
                state
            );
        }
    )


);

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();
