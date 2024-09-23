import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from "../../../models/board";
import {Task} from "../../../models/task";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
    @Input() board? : Board | null;
    @Input() task: Task | null = null;
    @Output() hideEvent = new EventEmitter<void>();

    // hide delete modal
    closeDelete():void {
        this.hideEvent.emit()
    }
}
