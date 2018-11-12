import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
  });

  it('renders markup to snapshot', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});
