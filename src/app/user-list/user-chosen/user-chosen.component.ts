import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'models/User';
import { faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-chosen',
  templateUrl: './user-chosen.component.html',
  styleUrls: ['./user-chosen.component.scss']
})
export class UserChosenComponent implements OnInit {
  @Input() user: User;
  faCaretDown: IconDefinition = faCaretDown;
  expand: boolean;
  @Output('expand') expandEvent: EventEmitter<boolean> = new EventEmitter<boolean>();;

  constructor() {}

  ngOnInit() {
    this.expand = false;
    this.expandEvent.emit(this.expand);
  }

  expandList() {
    this.expand = !this.expand;
    this.expandEvent.emit(this.expand);
  }

}
