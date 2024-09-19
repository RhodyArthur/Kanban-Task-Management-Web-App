import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSelectedBoard } from '../../state/board/board.actions';
import { BoardService } from '../../services/board.service';
import { Board } from '../../models/board';
import { boardState } from '../../state/board/board.entity';
import { selectSelectedBoard } from '../../state/board/board.selectors';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TaskComponent } from "./task/task.component";
import { Task } from '../../models/task';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  selectedBoard$!: Observable<Board | null | undefined>;

  constructor(private store: Store<boardState>) {}
  
  ngOnInit() {
  this.selectedBoard$ = this.store.select(selectSelectedBoard);
  this.selectedBoard$.subscribe(data => console.log(data))
}

}
