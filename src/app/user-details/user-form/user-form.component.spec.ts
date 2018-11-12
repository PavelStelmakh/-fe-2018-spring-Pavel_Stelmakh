import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserFormComponent } from './user-form.component';
import { BASE_URL } from '../../url.service';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

const translations = {
  "user-details": {
    "user-form": {
      "name": "Your name",
      "password": "Your password",
      "age": "Your age",
      "birthday": "Your birthday",
      "dateOfLogin": "Date of login",
      "information": "Information",
      "dateOfNotification": "Date of notification",
      "submit": "send request",
      "messages": {
          "success": "OK",
          "name": "Username must consist of one or two word with camel case sensitive",
          "password": "Password have to contain min 3 char",
          "existname": "This name exist already",
          "age": "Range of numbers should from 18 till 65",
          "dateOfBirth": "date should have format YYYY/MM/DD",
          "dateOfFirstLogin": "date should have format DD MMMM YYYY",
          "information": "Field is required",
          "dateOfNextNotif": "date should have format DD-MMM-YY"
      }
  }
  }
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [
        UserFormComponent
      ],
      providers: [
        {provide: BASE_URL, useValue: 'http://localhost:3000'},
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
    fixture = TestBed.createComponent(UserFormComponent);
    translate = TestBed.get(TranslateService);
  });

  it('renders markup to snapshot', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

});
