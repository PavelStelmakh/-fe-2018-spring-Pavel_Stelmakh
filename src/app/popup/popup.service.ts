import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService implements OnDestroy {
  showPopup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  show() {
    this.showPopup.next(true);
   setTimeout(() => this.showPopup.next(false), 3000);
  }

  ngOnDestroy() {
    this.showPopup.complete();
  }

}
