import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.scss']
})
export class InvalidInputComponent {
  @Input() message: string;
  @Input() type: ['error', 'success'];

  constructor() { }

}
