import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../../models/task';
import { TaskDetailsComponent } from "../task-details/task-details.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskDetailsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnChanges{
  
  @Input() task!: Task;
  completedTasksCount: number = 0;
  showModal: boolean = false;
  
  // update completed tasks count
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.task) return;
    this.completedTasksCount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  // display task details
  viewTaskDetails() {
    this.showModal = !this.showModal;
    console.log('view details');
  }
  
}
