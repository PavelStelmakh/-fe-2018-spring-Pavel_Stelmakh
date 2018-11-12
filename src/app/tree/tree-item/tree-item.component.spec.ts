import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeItemComponent } from './tree-item.component';

describe('TreeItemComponent', () => {
  let fixture: ComponentFixture<TreeItemComponent>;
  let component: TreeItemComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreeItemComponent
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
  });

  it('renders markup to snapshot', () => {
    component.expandItem = true;
    fixture.detectChanges();
    
    expect(fixture).toMatchSnapshot();
  });

});
