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

        const newState = boardAdaptor.updateOne(
            { id: boardId, changes: updatedBoard },
            state
        );

        // Update selectedBoard if the boardId matches
        const updatedSelectedBoard =
            newState.selectedBoard?.id === boardId
                ? updatedBoard
                : newState.selectedBoard;

        // Persist the updated selectedBoard in localStorage
        localStorage.setItem('selectedBoard', JSON.stringify(updatedSelectedBoard));

        // Return the new state with updated selectedBoard
        return {
            ...newState,
            selectedBoard: updatedSelectedBoard,
        };
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

        // Update selectedBoard if the boardId matches
        const updatedSelectedBoard =
            state.selectedBoard?.id === boardId ? updatedBoard : state.selectedBoard;

        // Persist the updated selectedBoard in localStorage
        localStorage.setItem('selectedBoard', JSON.stringify(updatedSelectedBoard));

        // Update both the board entity and the selectedBoard
        return boardAdaptor.updateOne(
            { id: board.id, changes: updatedBoard },
            {
                ...state,
                selectedBoard: updatedSelectedBoard,
            }
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

            // Find source and target columns
            const sourceCol = board.columns.find((col) => col.name === sourceColumn);
            const targetCol = board.columns.find((col) => col.name === targetColumn);
            if (!sourceCol || !targetCol) return state;

            // Find task to move from the source column
            const taskToMove = sourceCol.tasks.find((task) => task.title === taskId);
            if (!taskToMove) return state;

            // Remove task from the source column
            const updatedSourceColumn = {
                ...sourceCol,
                tasks: sourceCol.tasks.filter((task) => task.title !== taskId), // Remove task
            };

            // Add task to the target column at the last index
            const updatedTargetColumn = {
                ...targetCol,
                tasks: [...targetCol.tasks, taskToMove], // Append task to the end
            };

            // Update columns in the board
            const updatedColumns = board.columns.map((col) =>
                col.name === sourceColumn
                    ? updatedSourceColumn
                    : col.name === targetColumn
                        ? updatedTargetColumn
                        : col
            );

            // Update the board with the modified columns
            const updatedBoard = {
                ...board,
                columns: updatedColumns,
            };

            // Update selectedBoard in state
            const updatedSelectedBoard =
                state.selectedBoard?.id === boardId
                    ? updatedBoard
                    : state.selectedBoard;

            // Save the updated board to localStorage
            localStorage.setItem(
                'selectedBoard',
                JSON.stringify(updatedSelectedBoard)
            );

            // Update the board entity and selectedBoard
            return boardAdaptor.updateOne(
                { id: board.id, changes: updatedBoard },
                {
                    ...state,
                    selectedBoard: updatedSelectedBoard,
                }
            );
        }
    )
);

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();
