import { Component } from '@angular/core';
import { ThemeComponent } from "../theme/theme.component";
import {  Observable } from 'rxjs';
import { Board } from '../../models/board';
import { loadBoards } from '../../state/board/board.actions';
import { selectAllBoards } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ThemeComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  boards$!: Observable<Board[]>;
  showSidebar: boolean = true;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
   this.boards$ = this.boardService.boards$;
  }

  hideSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
