import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import getTreeItems from '../../../shared/getTreeItems';

@Injectable({
  providedIn: 'root'
})
export class TreeService implements OnDestroy {
  items: string[] = getTreeItems;
  path: string[] = [];
  pathupdate: Subject<void> = new Subject<void>();
  search: Subject<string> = new Subject<string>();

  constructor() {}

  ngOnDestroy() {
    this.search.complete();
    this.pathupdate.complete();
  }

  getTreeItems(): string[] {
    return this.items;
  }

  pushPath(item: string) {
    this.path.push(item);
    this.pathupdate.next();
  }

  setPath(index: number, item: string) {
    this.path[index] += `,${item}`;
    this.pathupdate.next();
  }

  popPath(items: string[]) {
    this.path = items.slice();
    this.pathupdate.next();
  }

  resetPath() {
    this.path = [];
    this.pathupdate.next();
  }

}
