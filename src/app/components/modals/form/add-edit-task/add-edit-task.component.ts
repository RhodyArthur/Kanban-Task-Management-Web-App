import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectComponent} from "../../../select/select.component";
import {Board} from "../../../../models/board";
import {Task} from "../../../../models/task";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {boardState} from "../../../../state/board/board.entity";
import {BoardService} from "../../../../services/board.service";
import {Subtask} from "../../../../models/subtask";

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
    imports: [
        SelectComponent, ReactiveFormsModule
    ],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss'
})
export class AddEditTaskComponent implements  OnInit{

    @Input() board? : Board | null;
    @Input() task: Task | null = null;
    currentStatuses: string[] = [];
    @Output() hideEvent = new EventEmitter<void>();
    taskForm!: FormGroup;


    constructor(private fb: FormBuilder,
                private store: Store<boardState>,
                private boardService: BoardService) {
                this.initForm();
    }

    // initialize form
    initForm():void {
        this.taskForm = this.fb.group({
            title: [this.task?.title || '', [Validators.required, Validators.minLength(2)]],
            description: [this.task?.description || ''],
            status: [this.task?.status || '', Validators.required],
            subtasks: this.fb.array([])
        })
    }

    ngOnInit():void {
        this.boardService.selectedBoard.getValue()?.columns.forEach(column => this.currentStatuses.push(column.name));

    //     if existing task, populate fields
        if(this.task) {
            this.taskForm.patchValue({
                title: this.task.title,
                description: this.task.description,
                status: this.task.status,
            })
            this.setSubtasks(this.task.subtasks);
        }
    }

    // get subtasks
    get subtasks(): FormArray {
        return  this.taskForm.get('subtasks') as FormArray;
    }

    // set subtasks for existing tasks
    setSubtasks(subtasks: Subtask[]): void {
        const subTasksFormArray = this.subtasks;

        // clear existing subtasks if any
        subTasksFormArray.clear();

        subtasks.forEach(subtask => {
            subTasksFormArray.push(this.fb.control(subtask.title, Validators.required))
        })
    }

    // add new subtasks
    addNewSubtask():void {
        this.subtasks.push(this.fb.control('', Validators.required))
    }

    // remove subtask
    removeSubtask(index: number): void {
        this.subtasks.removeAt(index)
    }

    // hide form modal
    closeForm():void {
        this.hideEvent.emit()
    }

    onSubmit(): void {
        if (this.taskForm.valid) {
            const newSubtasks = this.subtasks.value.map((subtask: string) =>  ({
                title: subtask,
                isCompleted: false
            }))

        //     create task
            const newTask: Task = {
                ...this.taskForm.value,
                subtasks: newSubtasks
            }

        //     update task or create task
            if (this.task) {

            }

        }
    }
}
