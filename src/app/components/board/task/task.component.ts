import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnChanges{
  
  @Input() task!: Task;
  completedTasksCount: number = 0;
  
  // update completed tasks count
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.task) return;
    this.completedTasksCount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
  }

  // display task details
  viewTaskDetails() {
    console.log('view details');
  }
  
}
