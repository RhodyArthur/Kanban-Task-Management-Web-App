import { Component } from '@angular/core';
import { ThemeComponent } from '../theme/theme.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { Store } from '@ngrx/store';
import { setSelectedBoard } from '../../state/board/board.actions';
import { selectSelectedBoard } from '../../state/board/board.selectors';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  boards$!: Observable<Board[]>;

  constructor(private boardService: BoardService,
              private store: Store
  ) {
    this.boards$ = boardService.boards$;
  }

  selectedBoard$ = this.store.select(selectSelectedBoard);

  onBoardSelect(board: Board) {
    this.store.dispatch(setSelectedBoard({ board }));
  }

}
