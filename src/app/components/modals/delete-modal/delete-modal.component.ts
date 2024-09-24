import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from "../../../models/board";
import {Task} from "../../../models/task";
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
    @Input() board! : Board | null | undefined;
    @Input() task: Task | null = null;
    @Output() hideEvent = new EventEmitter<void>();

    constructor(private boardService: BoardService) {
    }

    delete() {
        if (this.board) {
            this.boardService.deleteBoard(this.board.id);
        } else if (this.task) {
            this.boardService.deleteTask(this.task.title);
        }
        this.hideEvent.emit();
    }


    // hide delete modal
    closeDelete():void {
        this.hideEvent.emit()
    }
}
