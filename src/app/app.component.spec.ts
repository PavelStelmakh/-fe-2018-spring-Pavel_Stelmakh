import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import * as langReducer from './reducers/language.reducer';

const translations = {
  "title": "Angular training",
  "login": {
    "login": "login"
  } 
};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let translate: TranslateService;
  let store: Store<langReducer.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(() => hot('-a', { a: 'en' }))
          }
        }
      ],
      schemas: [
       NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    translate = TestBed.get(TranslateService);
    store = TestBed.get(Store);
  });

  it('renders markup to snapshot', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

});
