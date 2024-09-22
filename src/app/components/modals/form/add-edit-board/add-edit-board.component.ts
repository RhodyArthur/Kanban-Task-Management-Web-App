import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../../models/board';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Column } from '../../../../models/column';
import { Store } from '@ngrx/store';
import { boardState } from '../../../../state/board/board.entity';
import { addBoard, loadBoards, setSelectedBoard, updateBoard } from '../../../../state/board/board.actions';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-board',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-board.component.html',
  styleUrl: './add-edit-board.component.scss'
})
export class AddEditBoardComponent {
  @Input() board?: Board | null;
  @Output() hideEvent = new EventEmitter<void>();

  boardForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private store: Store<boardState>
  ) {
    this.initForm();
  }

  // initialize form
  initForm() {
    this.boardForm = this.fb.group({
      name: [this.board?.name || '', [Validators.required, Validators.minLength(2)]],
      columns: this.fb.array([])
    })
  }

  ngOnInit() {
    // if existing board,populate fields
    if(this.board) {
      this.boardForm.patchValue(
        {name: this.board.name}
      )
      this.setColumns(this.board.columns)
    }
  }

   // get columns
   get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }
  
  // set columns for existing board 
  setColumns(columns: Column[]) {
    const columnFormArray = this.columns;

    // Clear existing columns if any
    columnFormArray.clear(); 
    columns.forEach(column => {
      columnFormArray.push(this.fb.control(column.name, Validators.required));
    });
  }

  
 

  // add new column
  addNewColumn() {
    this.columns.push(this.fb.control('', Validators.required))
  }

  // remove column
  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  // hide form
  hideModal() {
    this.hideEvent.emit();
  }

  onSubmit() {
    if(this.boardForm.valid) {

      const newColumns = this.columns.value.map((columnName:string, index:number) => {
        const existingColumn = this.board ? this.board.columns[index] : null;

        return {
          name: columnName,
          tasks: existingColumn ? existingColumn.tasks : []
        }
    })

      // create board
      const newBoard: Board = {
        id: this.board ? this.board.id : uuidv4(),
        name: this.boardForm.value.name,
        columns: newColumns
      }

      // update board
      if(this.board) {
        this.store.dispatch(updateBoard({board: newBoard}))
        this.store.dispatch(setSelectedBoard({board: newBoard}))
      }
      else {
        this.store.dispatch(addBoard({board: newBoard}))
      }

      this.boardForm.reset();
      this.columns.clear();
      this.hideEvent.emit();
    }
  }
}


