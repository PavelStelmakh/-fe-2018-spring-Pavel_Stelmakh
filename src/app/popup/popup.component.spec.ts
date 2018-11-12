import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';

describe('PopupComponent', () => {
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PopupComponent
      ],
      providers: [
        PopupService
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
  });

  it('renders markup to snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

});
