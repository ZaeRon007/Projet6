import { Component, OnDestroy } from '@angular/core';
import { AuthRequest } from 'src/app/core/models/auth.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.scss']
})
export class userRegisterComponent implements OnDestroy{
  user: AuthRequest = {email: "", name: "", password: ""};
  registerSubscription: Subscription = new Subscription();


  constructor(private router: Router,
              private authService: AuthService) { 
  }

  isFormValid(): boolean {
    return !!this.user.name.trim() && !!this.user.email.trim() && !!this.user.password.trim();
  }

  onSubmit():void {
    this.registerSubscription = this.authService.registerUser(this.user).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });
    
  }

  ngOnDestroy(): void {
      this.registerSubscription.unsubscribe();
  }
}