import { Component, OnDestroy, OnInit } from '@angular/core';
import { userEntity } from 'src/app/core/models/userEntity';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/themeService';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';
import { UserService } from '../../services/userService';
import { ArticleService } from '../../services/articlesService';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit, OnDestroy {
  displayThemes: DisplayThemes[] = [new DisplayThemes()];
  getMeSubscription: Subscription = new Subscription();
  updateMeSubscription: Subscription = new Subscription();
  unSubscribeSubscription: Subscription = new Subscription();
  displayThemeSubscription: Subscription = new Subscription();

  user: userEntity = {name: "name", email: "email"};
  
  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private userService: UserService,
              private articleService: ArticleService){
  }

  ngOnInit(): void {
    this.getMeSubscription = this.userService.getMe().subscribe((response : userEntity) => {
      this.user = response;
    });

    this.displayThemeSubscription = this.articleService.setupThemeSubscriptionDisplay().subscribe((response: DisplayThemes[]) => {
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
