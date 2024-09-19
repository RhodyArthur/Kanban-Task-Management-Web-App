import { createReducer, on } from "@ngrx/store";
import { boardAdaptor, initialBoardState } from "./board.entity";
import { addBoard, deleteBoard, loadBoards, loadBoardsFailure, loadBoardsSuccess, setSelectedBoard, updateBoard } from "./board.actions";

export const boardReducer = createReducer(
    initialBoardState,

    on(loadBoards, (state) => ({...state, loading:true})),
    on(loadBoardsSuccess, (state, {boards}) => boardAdaptor.setAll(boards, {...state, loading:false})),
    on(loadBoardsFailure, (state) => ({...state, loading:false})),
    on(addBoard, (state, {board}) => boardAdaptor.addOne(board, {...state})),
    on(updateBoard, (state, {board}) => boardAdaptor.updateOne({id: board.id, changes:board}, state)),
    on(deleteBoard, (state, {id}) => boardAdaptor.removeOne(id, state)),
    on(setSelectedBoard, (state, {board}) => ({...state, selectedBoard: board}))
)

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();