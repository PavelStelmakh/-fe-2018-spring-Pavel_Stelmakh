import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-and-tree',
  templateUrl: './search-and-tree.component.html',
  styleUrls: ['./search-and-tree.component.scss']
})
export class SearchAndTreeComponent implements OnInit {
  selectFirst: boolean;

  constructor() { }

  ngOnInit() {
    this.selectFirst = true;
  }

  onToggle(event){
    if (!event.target.classList.contains('select')) {
      this.selectFirst = !this.selectFirst;
    } 
  }
}
