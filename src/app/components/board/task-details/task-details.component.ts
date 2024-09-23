import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../../models/task';
import { MenuComponent } from "../../menu/menu.component";
import { SelectComponent } from "../../select/select.component";
import { BoardService } from '../../../services/board.service';
import {AddEditTaskComponent} from "../../modals/form/add-edit-task/add-edit-task.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
    imports: [MenuComponent, SelectComponent, AddEditTaskComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Output() hideEvent = new EventEmitter<void>();
  showTaskForm: boolean = false;

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
      this.showTaskForm = true;
  }

  onDeleteTask() {
    console.log('delete')
  }

  hideModal() {
    this.hideEvent.emit();
  }

  closeTaskForm(): void {
      this.showTaskForm = false;
  }
}
