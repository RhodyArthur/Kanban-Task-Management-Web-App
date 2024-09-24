import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Task } from '../../../models/task';
import { TaskDetailsComponent } from "../task-details/task-details.component";
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskDetailsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnChanges, OnInit{

  @Input() task!: Task;
  completedTasksCount: number = 0;
  showModal: boolean = false;

    constructor(private boardService: BoardService) {}


    ngOnInit() {
      this.updateCompletedTasksCount();
  }

  // update completed tasks count
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['task']) {
        this.updateCompletedTasksCount();
      }
  }

    // update completed tasks count
    updateCompletedTasksCount() {
        if(!this.task) return;
        this.completedTasksCount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
    }

    onTaskChange(updatedTask: Task) {
        this.task = updatedTask;
        this.updateCompletedTasksCount();
        this.boardService.updateTask(updatedTask);
    }

  // display task details
  viewTaskDetails() {
    this.showModal = !this.showModal;
  }

  // hide modal
  hideModal() {
    this.showModal = false;
  }

}
