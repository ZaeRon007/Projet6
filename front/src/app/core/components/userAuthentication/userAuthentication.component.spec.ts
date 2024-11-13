import { ComponentFixture, TestBed } from '@angular/core/testing';
import { userAuthenticationComponent } from './userAuthentication.component';

describe('userAuthenticationComponent', () => {
  let component: userAuthenticationComponent;
  let fixture: ComponentFixture<userAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ userAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(userAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
