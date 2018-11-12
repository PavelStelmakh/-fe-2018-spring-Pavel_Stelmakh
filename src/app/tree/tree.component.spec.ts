import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeService } from './tree.service';

describe('TreeComponent', () => {
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TreeComponent
      ],
      providers: [
        TreeService
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
  });

  it('renders markup to snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

});
