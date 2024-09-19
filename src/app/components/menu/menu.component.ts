import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
showDropDown: boolean = false;

@Output() edit = new EventEmitter<void>();
@Output() delete = new EventEmitter<void>();

toggleDropDown() {
  this.showDropDown = !this.showDropDown;
}

// emit events on click
onEditClick() {
  this.edit.emit();
}

onDeleteClick() {
  this.delete.emit();
}
}
