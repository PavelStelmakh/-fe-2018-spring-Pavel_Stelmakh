import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InvalidInputComponent } from './invalid-input.component';

describe('InvalidInputComponent', () => {
  let fixture: ComponentFixture<InvalidInputComponent>;
  let component: InvalidInputComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvalidInputComponent
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidInputComponent);
    component = fixture.componentInstance;
  });

  it('renders markup to snapshot', () => {
    component.message = 'Username must consist of one or two word with camel case sensitive';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});
