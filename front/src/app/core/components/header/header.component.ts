import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  flagMenu: boolean = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((res) => console.log('data: ', res));
  }

  openMenu() {
    this.flagMenu = !this.flagMenu;
  }

  closeSideNav(){
    this.flagMenu = false;
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
