import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-full-header',
  templateUrl: './full-header.component.html',
  styleUrls: ['./full-header.component.scss']
})
export class FullHeaderComponent {
  flagMenu: boolean = false;

  constructor(private authService: AuthService) { }
  
  openMenu() {
    this.flagMenu = !this.flagMenu;
  }

  closeSideNav() {
    this.flagMenu = false;
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
