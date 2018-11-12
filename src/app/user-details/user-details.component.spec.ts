import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users.service';
import { BASE_URL } from '../url.service';

const translations = {
  "user-details": {
    "tabOut": "Show Deteils",
    "tabIn": "Edit Deteils",
    "logout": "logout"
  }
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('UserDetailsComponent', () => {
  let fixture: ComponentFixture<UserDetailsComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [
        UserDetailsComponent
      ],
      providers: [
        {provide: BASE_URL, useValue: 'http://localhost:3000'},
        AuthService,
        UsersService,
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn()
          }
        }
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    translate = TestBed.get(TranslateService);
  });

  it('renders markup to snapshot', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});
