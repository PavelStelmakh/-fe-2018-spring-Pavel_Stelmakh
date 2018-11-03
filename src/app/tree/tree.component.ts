import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TreeService } from './tree.service';
import { FormControl } from '@angular/forms';
import { TreeItemComponent } from './tree-item/tree-item.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  items: string[];
  pathout: FormControl;
  pathin: FormControl;
  @ViewChildren(TreeItemComponent) itemComponents: QueryList<TreeItemComponent>;

  constructor(public treeService: TreeService) { }

  ngOnInit() {
    this.items = this.treeService.getTreeItems();
    this.pathout = new FormControl({value: '', disabled: true});
    this.pathin = new FormControl('');
    this.treeService.pathupdate.subscribe(() => this.pathout.setValue(this.treeService.path.join('->')));
    this.treeService.search.subscribe((path: string) => {
      this.filter(path);
    });
  }

  resetTree() {
    this.items = this.treeService.getTreeItems();
    this.treeService.resetPath();
  }

  search() {
    const searchpath: string = this.pathin.value.trim();
    this.treeService.search.next(searchpath);
  }

  filter(Searchingitem: string) {
    this.items = this.itemComponents
    .filter((component: TreeItemComponent) => Searchingitem === component.itemTree || component.expandItem)
    .map((component: TreeItemComponent) => component.itemTree);
  }

}
