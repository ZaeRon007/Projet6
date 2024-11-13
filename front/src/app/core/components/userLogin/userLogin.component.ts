import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthRequest } from 'src/app/core/interface/auth.interface';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.scss']
})
export class userLoginComponent implements OnInit {
  private apiUrl = environment.baseUrl;

  name!: string;
  password!: string;

  constructor(private httpclient: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.name = "";
    this.password = "";
  }

  fillAuthReq(name: string, password: string): AuthRequest{
    let authReq;

    if(this.name.includes('@'))
      authReq= {name: "" , email: name, password: password};
    else
      authReq= {name: name , email: "", password: password};

    return authReq as AuthRequest;
  }

  onSubmit():void {
    let authReq : AuthRequest = this.fillAuthReq(this.name, this.password);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpclient.post(`${this.apiUrl}auth/login`, authReq, {headers}).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });

  }

}
