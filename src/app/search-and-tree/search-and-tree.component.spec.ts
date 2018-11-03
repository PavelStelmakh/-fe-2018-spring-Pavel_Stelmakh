import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndTreeComponent } from './search-and-tree.component';

describe('SearchAndTreeComponent', () => {
  let component: SearchAndTreeComponent;
  let fixture: ComponentFixture<SearchAndTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
