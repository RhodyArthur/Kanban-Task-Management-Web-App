import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
@Input({ required: true }) selectedStatus!: string;
@Input({ required: true }) statuses: string[] = [];

@Output() emitChangeSelectStatus = new EventEmitter();


  public onChangeValue(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.emitChangeSelectStatus.emit(selectElement.value);
  }
}
