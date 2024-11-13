import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRequest } from 'src/app/core/interface/auth.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-userRegister',
  templateUrl: './userRegister.component.html',
  styleUrls: ['./userRegister.component.scss']
})
export class userRegisterComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;

  private apiUrl = environment.baseUrl;

  constructor(private httpclient: HttpClient,
              private router: Router,
              private authService: AuthService) { 
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm):void {
    const registerReq = form.value as AuthRequest;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpclient.post(`${this.apiUrl}auth/register`, registerReq, {headers}).subscribe((response: any) => {
      this.authService.setToken(response.token);
      this.router.navigateByUrl('/articles/home');
    });
  }
}