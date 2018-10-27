import { Component, OnInit } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  show: boolean;

  constructor(private popup: PopupService) {}

  ngOnInit() {
    this.show = false;
    this.popup.showPopup.subscribe((result: boolean) => this.show = result);
  }

}
