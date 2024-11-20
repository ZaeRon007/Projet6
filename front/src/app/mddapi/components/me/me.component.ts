import { Component, OnDestroy, OnInit } from '@angular/core';
import { userEntity } from 'src/app/core/models/userEntity';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/themeService';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit, OnDestroy {
  displayThemes: DisplayThemes[] = [new DisplayThemes()];
  getMeSubscription!: Subscription;
  updateMeSubscription!: Subscription;
  unSubscribeSubscription!: Subscription;
  displayThemeSubscription!: Subscription;

  user: userEntity = {name: "name", email: "email"};
  
  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private userService: UserService){
  }

  ngOnInit(): void {
    this.getMeSubscription = this.userService.getMe().subscribe((response : userEntity) => {
      this.user = response;
    });

    this.displayThemeSubscription = this.themeService.setupThemeSubscriptionDisplay().subscribe((response: DisplayThemes[]) => {
      this.displayThemes = response;
    });
  }

  onSubmit():void {
    this.updateMeSubscription = this.userService.updateMe(this.user).subscribe();
  }

  logOut(): void {
    this.authService.logOut();
  }

  onClickUnSubscribe(id: number):void {
    this.unSubscribeSubscription = this.themeService.unSubscribeToTheme(id).subscribe();
  }

  ngOnDestroy(): void {
    this.getMeSubscription.unsubscribe();
    this.updateMeSubscription.unsubscribe();
    this.unSubscribeSubscription.unsubscribe();
    this.displayThemeSubscription.unsubscribe();
  }

}
