import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userAuthentication',
  templateUrl: './userAuthentication.component.html',
  styleUrls: ['./userAuthentication.component.scss']
})
export class userAuthenticationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register():void {
    this.router.navigateByUrl('/auth/register');
  }

  login():void {
    this.router.navigateByUrl('/auth/login');
  }
}
