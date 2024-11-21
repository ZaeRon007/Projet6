import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthRequest } from 'src/app/core/models/auth.interface';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.scss']
})
export class userLoginComponent implements OnDestroy {
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
