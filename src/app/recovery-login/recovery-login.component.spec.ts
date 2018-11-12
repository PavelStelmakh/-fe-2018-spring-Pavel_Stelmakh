import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecoveryLoginComponent } from './recovery-login.component';
import { UsersService } from '../users.service';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from '../url.service';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

const translations = {
  "login": {
    "wrongData": "wrong data",
    "notFound": "such login is not found",
    "back": "back",
    "recovery": "recovery",
    "user-details": {
      "user-form": {
        "messages": {
          "dateOfBirth": "date should have format YYYY/MM/DD"
        }
      }
    }
  }
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('RecoveryLoginComponent', () => {
  let fixture: ComponentFixture<RecoveryLoginComponent>;
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
      providers: [
        {provide: BASE_URL, useValue: 'http://localhost:3000'},
        UsersService,
        AuthService
      ],
      declarations: [
        RecoveryLoginComponent
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryLoginComponent);
    translate = TestBed.get(TranslateService);
    translate.use('en');
  });

  it('renders markup to snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

});
