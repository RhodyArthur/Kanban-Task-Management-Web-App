import { Component } from '@angular/core';
import { ThemeComponent } from '../theme/theme.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  boards$!: Observable<Board[]>;

  constructor(private boardService: BoardService) {
    this.boards$ = boardService.boards$;
  }


}
