import { ComponentFixture, TestBed } from '@angular/core/testing';
import { userRegisterComponent } from './userRegister.component';

describe('userRegisterComponent', () => {
  let component: userRegisterComponent;
  let fixture: ComponentFixture<userRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ userRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(userRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
