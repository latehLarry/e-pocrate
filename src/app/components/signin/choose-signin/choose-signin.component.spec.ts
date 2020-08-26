import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSigninComponent } from './choose-signin.component';

describe('ChooseSigninComponent', () => {
  let component: ChooseSigninComponent;
  let fixture: ComponentFixture<ChooseSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
