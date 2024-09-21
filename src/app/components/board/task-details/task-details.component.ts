import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../../models/task';
import { MenuComponent } from "../../menu/menu.component";
import { SelectComponent } from "../../select/select.component";
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [ MenuComponent, SelectComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Output() editEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();
  @Output() hideEvent = new EventEmitter<void>();

  currentStatuses: string[] = [];
  completedTasksCount: number = 0;

  constructor (private boardService: BoardService) {}

  ngOnInit() {
    // get column names to display status
    this.boardService.selectedBoard.getValue()?.columns.forEach(column => this.currentStatuses.push(column.name));
  }

    // update completed tasks count
    ngOnChanges(changes: SimpleChanges): void {
      if(!this.task) return;
      this.completedTasksCount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
    }

  onEditTask() {
    this.editEvent.emit();

  }

  onDeleteTask() {
    this.deleteEvent.emit();
  }

  hideModal() {
    this.hideEvent.emit();
  }
}
