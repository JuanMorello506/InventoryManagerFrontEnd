import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignIn } from './login-sign-in';

describe('LoginSignIn', () => {
  let component: LoginSignIn;
  let fixture: ComponentFixture<LoginSignIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
