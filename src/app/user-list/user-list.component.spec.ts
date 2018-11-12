import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { UserListComponent } from './user-list.component';
import * as usersReducer from '../reducers/users.reducer';

const translations = {
  "user-list": {
    "notFound": "sorry, nothing is found"
  } 
};

const users = [];

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<{}> {
    return of(translations);
  }
}

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let translate: TranslateService;
  let store: Store<usersReducer.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        }),
        ReactiveFormsModule
      ],
      declarations: [ 
        UserListComponent
       ],
      providers: [ 
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn(() => hot('-a', { a: users }))
          }
        }
       ],
       schemas: [
        NO_ERRORS_SCHEMA
       ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    translate = TestBed.get(TranslateService);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    translate.use('en');
  });
  
  it('renders markup to snapshot with empty array of users', async () => {
    component.expand = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

});
