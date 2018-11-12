import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OutputFormComponent } from './output-form.component';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import * as profileReducer from '../../reducers/profile.reduser';

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
    }
  }
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('OutputFormComponent', () => {
  let fixture: ComponentFixture<OutputFormComponent>;
  let translate: TranslateService;
  let store: Store<profileReducer.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [
        OutputFormComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(() => hot('-a', { 
              a: {
                "id": 1,
                "name": "Admin",
                "age": "19",
                "password": "Admin",
                "dateOfBirth": "2011-10-05T00:00:00.000Z",
                "dateOfFirstLogin": "2011-10-05T14:48:00.000Z",
                "dateOfNextNotif": "2011-10-05T14:48:00.000Z",
                "information": "I'm ADMIN",
                "role": "admin"
              }
            }))
          }
        }
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputFormComponent);
    translate = TestBed.get(TranslateService);
    store = TestBed.get(Store);
  });

  it('renders markup to snapshot', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

});
