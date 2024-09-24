import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { Task } from '../../../models/task';
import { MenuComponent } from "../../menu/menu.component";
import { SelectComponent } from "../../select/select.component";
import { BoardService } from '../../../services/board.service';
import {AddEditTaskComponent} from "../../modals/form/add-edit-task/add-edit-task.component";
import {AsyncPipe} from "@angular/common";
import {DeleteModalComponent} from "../../modals/delete-modal/delete-modal.component";
import {Store} from "@ngrx/store";
import {moveTask, updateTask} from "../../../state/board/board.actions";

@Component({
  selector: 'app-task-details',
  standalone: true,
    imports: [MenuComponent, SelectComponent, AddEditTaskComponent, AsyncPipe, DeleteModalComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements  OnInit, OnChanges{
  @Input() task!: Task;
  @Output() hideEvent = new EventEmitter<void>();
  @Output() taskChange = new EventEmitter<Task>();
  showTaskForm: boolean = false;
  showDeleteModal: boolean = false;
  currentStatuses: string[] = [];
  boardId!: string;
  completedTasksCount: number = 0;

  constructor (private boardService: BoardService,
               private cdr: ChangeDetectorRef,
               private store: Store) {}

  ngOnInit() {
    // get column names to display status
    this.boardService.selectedBoard.getValue()?.columns
        .forEach(column => {
            this.currentStatuses.push(column.name);
        });

    // get board id
    this.boardService.selectedBoard.subscribe(board => {
        if (board) {
            this.boardId = board.id
        }
    })

  }

    ngOnChanges(changes: SimpleChanges): void {
      if(!this.task) return;
      if (changes['task']) {
        this.updateCompletedTasksCount();
      }
    }

  // update completed tasks count
    updateCompletedTasksCount() {
      this.completedTasksCount = this.task.subtasks.filter(subtask => subtask.isCompleted).length;
      this.cdr.detectChanges();
    }

    // handle the change event for a subtask's checkbox,
    onSubtasksChange(index: number, event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const isCompleted = checkbox.checked;

        // create updated task object
        const updatedTask = {
            ...this.task,
            subtasks: this.task.subtasks.map((subtask, i) =>
                i === index ? { ...subtask, isCompleted } : subtask
            ),
        };

    //     dispatch an action to update store
        this.store.dispatch(
            updateTask({
                boardId: this.boardId,
                columnName: this.task.status,
                task: updatedTask,
            })
        );


        //  update count
        this.taskChange.emit(updatedTask);
        this.updateCompletedTasksCount();

    }

    onStatusChange(event: Event) {
        const newStatus = (event.target as HTMLSelectElement).value;
        if (newStatus !== this.task.status) {
            this.store.dispatch(
                moveTask({
                    boardId: this.boardId,
                    sourceColumn: this.task.status,
                    targetColumn: newStatus,
                    taskId: this.task.title,
                })
            );
            const updatedTask = { ...this.task, status: newStatus };
            this.taskChange.emit(updatedTask);
        }
    }

  onEditTask() {
      this.showTaskForm = true;
  }

  onDeleteTask() {
    this.showDeleteModal = true;
  }

  hideModal() {
    this.hideEvent.emit();

  }

  closeTaskForm(): void {
      this.showTaskForm = false;
  }

  closeDeleteModal(): void {
      this.showDeleteModal = false;
  }
}
