import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PopupComponent],
  providers: [PopupService],
  exports: [PopupComponent]
})
export class PopupModule { }
