import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Board } from "../../models/board";

// define state
export interface boardState extends EntityState<Board> {
    loading: boolean,
}

// create adapter
export const boardAdaptor: EntityAdapter<Board> = createEntityAdapter<Board>(
    {
        selectId: (board: Board) => board.id,
        sortComparer: (a: Board, b: Board) => a.name.localeCompare(b.name)
    }
);

// define initial state
export const initialBoardState: boardState = boardAdaptor.getInitialState({
    loading: false,
});