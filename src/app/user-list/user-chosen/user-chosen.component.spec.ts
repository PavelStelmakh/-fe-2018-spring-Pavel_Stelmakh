import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserChosenComponent } from './user-chosen.component';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as profileReducer from '../../reducers/profile.reduser';
import { PopupService } from '../../popup/popup.service';

const translations = {
  "user-details": {
    "output-form": {
      "name": "Name",
      "password": "Password",
      "age": "Age",
      "birthday": "Birthday",
      "dateOfLogin": "Date of login",
      "information": "Information",
      "dateOfNotification": "Date of notification"
    },
    "user-chosen": {
        "AddButton": "Add",
        "DeleteButton": "Delete",
        "EditButton": "Edit"
    }
  }
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('UserChosenComponent', () => {
  let fixture: ComponentFixture<UserChosenComponent>;
  let translate: TranslateService;
  let store: Store<profileReducer.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [
        UserChosenComponent
      ],
      providers: [
        PopupService,
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(() => of({}))
          }
        }
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChosenComponent);
    translate = TestBed.get(TranslateService);
    store = TestBed.get(Store);
  });

  it('renders markup to snapshot', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

});
