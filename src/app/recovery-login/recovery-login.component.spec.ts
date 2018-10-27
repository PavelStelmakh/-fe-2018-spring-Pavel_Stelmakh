import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryLoginComponent } from './recovery-login.component';

describe('RecoveryLoginComponent', () => {
  let component: RecoveryLoginComponent;
  let fixture: ComponentFixture<RecoveryLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
