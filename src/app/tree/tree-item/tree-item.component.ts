import { 
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChildren,
  QueryList 
} from '@angular/core';
import { TreeService } from '../tree.service';
import { faCaretDown, IconDefinition, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent implements OnInit {
  items: string[];
  expandItem: boolean;
  @Input('item') itemTree: string;
  faCaretDown: IconDefinition = faCaretDown;
  faCaretLeft: IconDefinition = faCaretLeft;
  private path: string[];
  @ViewChildren(TreeItemComponent) itemComponents: QueryList<TreeItemComponent>;

  constructor(public treeService: TreeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.path = this.treeService.path.slice();
    this.treeService.search.subscribe((path: string) => {
      this.filter(path);
      this.cdr.markForCheck();
    });
    this.items = [];
    this.expandItem = false;
  }

  expandTree() {
    this.expandItem = !this.expandItem;
    if (this.expandItem) {
      if (this.treeService.path[this.path.length]) {
        this.treeService.setPath(this.path.length, this.itemTree);
      } else {
        this.treeService.pushPath(this.itemTree);
      }
      this.items = this.treeService.getTreeItems();
    } else {
      this.treeService.popPath(this.path);
    }
  }

  filter(Searchingitem: string) {
    this.items = this.itemComponents
    .filter((component: TreeItemComponent) => Searchingitem === component.itemTree || component.expandItem)
    .map((component: TreeItemComponent) => component.itemTree);
  }

}
