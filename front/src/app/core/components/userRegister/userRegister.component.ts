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
  logInSubscription: Subscription = new Subscription();


  constructor(private router: Router,
              private authService: AuthService) { 
  }

  isFormValid(): boolean {
    return !!this.user.name && !!this.user.email && !!this.user.password;
  }

  onSubmit():void {
    this.logInSubscription = this.authService.logInUser(this.user).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });
    
  }

  ngOnDestroy(): void {
      this.logInSubscription.unsubscribe();
  }
}