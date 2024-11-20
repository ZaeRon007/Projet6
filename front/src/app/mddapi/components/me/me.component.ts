import { Component, OnDestroy, OnInit } from '@angular/core';
import { userEntity } from 'src/app/core/models/userEntity';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
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
  displayThemes$ = new BehaviorSubject<DisplayThemes[]>([new DisplayThemes()]);
  getMeSubscription: Subscription = new Subscription();
  updateMeSubscription: Subscription = new Subscription();
  unSubscribeSubscription: Subscription = new Subscription();
  displayThemeSubscription: Subscription = new Subscription();
  user: userEntity = {name: "name", email: "email"};
  originalUsername: string = '';
  originalEmail: string = '';
  
  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private userService: UserService,
              private articleService: ArticleService){
  }

  ngOnInit(): void {
    this.getMeSubscription = this.userService.getMe().subscribe((response : userEntity) => {
      this.user = response;
      this.originalUsername = response.name;
      this.originalEmail = response.email;
    });

    this.displayThemeSubscription = this.articleService.setupThemeSubscriptionDisplay().pipe(
      tap(theme => this.displayThemes$.next(theme))).subscribe();
  }

  onSubmit():void {
    this.updateMeSubscription = this.userService.updateMe(this.user).subscribe();
  }

  logOut(): void {
    this.authService.logOut();
  }

  onClickUnSubscribe(id: number): void {
    this.unSubscribeSubscription = this.themeService.unSubscribeToTheme(id).subscribe(() => {
        const updatedThemes = this.displayThemes$.getValue().filter(theme => theme.id !== id);
        this.displayThemes$.next(updatedThemes);
    });
  }
  

  isFormValid(): boolean{
    return this.user.name != this.originalUsername || 
          this.user.email != this.originalEmail;
  }

  ngOnDestroy(): void {
    this.getMeSubscription.unsubscribe();
    this.updateMeSubscription.unsubscribe();
    this.unSubscribeSubscription.unsubscribe();
    this.displayThemeSubscription.unsubscribe();
  }

}
