import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { UserDropdownItemComponent } from './user-dropdown-item.component';

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

describe('UserDropdownItemComponent', () => {
  let component: UserDropdownItemComponent;
  let fixture: ComponentFixture<UserDropdownItemComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ],
      declarations: [ UserDropdownItemComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropdownItemComponent);
    component = fixture.componentInstance;
    translate = TestBed.get(TranslateService);
  });

  it('renders markup to snapshot', () => {
    component.user = {
      id: 2,
      name: 'Pasha',
      age: 19,
      password: '1111',
      dateOfBirth: '2011-10-05T00:00:00.000Z',
      dateOfFirstLogin: '2011-10-05T14:48:00.000Z',
      dateOfNextNotif: '2011-10-05T14:48:00.000Z',
      information: 'meaw',
      role: 'user'
    };
    translate.use('en');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  // it('should create', () => {
  //   expect(component).toBeDefined();
  // });
});
