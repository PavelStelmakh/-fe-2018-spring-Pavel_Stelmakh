import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeComponent } from './tree.component';
import { TreeItemComponent } from './tree-item/tree-item.component';
import { TreeService } from './tree.service';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  declarations: [TreeComponent, TreeItemComponent],
  providers: [TreeService],
  exports: [TreeComponent]
})
export class TreeModule { }
