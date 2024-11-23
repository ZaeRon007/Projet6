import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => console.log('data: ', res));
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
