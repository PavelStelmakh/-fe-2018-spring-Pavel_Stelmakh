import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDropdownListComponent } from './user-dropdown-list.component';

describe('UserDropdownListComponent', () => {
  let fixture: ComponentFixture<UserDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserDropdownListComponent
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownListComponent);
  });

  it('renders markup to snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

});
