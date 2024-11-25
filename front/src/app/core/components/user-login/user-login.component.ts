import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthRequest } from '../../models/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnDestroy {
  user: AuthRequest = {email: "", name: "", password: ""};
  logInSubscription: Subscription = new Subscription();
  username: string = "";

  constructor(private router: Router,
              private authService: AuthService) { }


  setupAuthReq() {

    if(this.username.includes('@'))
      this.user.email = this.username;
    else
      this.user.name = this.username;
  }

  isFormValid(): boolean {
    return !!this.user.password.trim() && !!this.username.trim();
  }


  onSubmit():void {
    this.setupAuthReq()
    this.logInSubscription = this.authService.loginUser(this.user).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });
  }

  ngOnDestroy(): void {
      this.logInSubscription.unsubscribe();
  }



}
