import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { AuthRequest } from '../../models/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnDestroy {
  user: AuthRequest = { email: "", name: "", password: "" };
  registerSubscription: Subscription = new Subscription();
  private passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  showError: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) {
  }

  isFormValid(): boolean {
    return !!this.user.name.trim() && !!this.user.email.trim() && !!this.isPasswordValid();
  }

  isPasswordValid(): boolean {
    return this.passwordRegex.test(this.user.password);
  }

  onSubmit(): void {
    this.registerSubscription = this.authService.registerUser(this.user).pipe(
      catchError((error) => {
        if (error.status == 400 || error.status == 401) {
          this.showError = true;
        }
        return throwError(() => error);
      })
    ).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });

  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }
}