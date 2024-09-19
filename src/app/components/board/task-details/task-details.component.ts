import { Component } from '@angular/core';
import { BackgroundBlurComponent } from "../../modals/background-blur/background-blur.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [BackgroundBlurComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

}
