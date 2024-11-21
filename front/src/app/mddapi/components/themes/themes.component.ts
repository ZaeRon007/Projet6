import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../services/themeService';
import { ArticleService } from '../../services/articlesService';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, OnDestroy {
  subscribedThemes$ = new BehaviorSubject<DisplayThemes[]>([new DisplayThemes()]);

  themeFetchSubscription: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();
  themeUnSubscription: Subscription = new Subscription();


  constructor(private themeService: ThemeService,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.themeFetchSubscription = this.articleService.setupDisplayThemes().pipe(
      tap((response: DisplayThemes[]) => this.subscribedThemes$.next(response))
    ).subscribe();
  }

  onClickSubscribe(id: number):void {
    this.themeSubscription = this.themeService.subscribeToTheme(id).subscribe(() => {
      const updatedSubscribedThemes = this.subscribedThemes$.value.map(theme => {
        if(theme.id == id)
          return {...theme, subscribed: true};
        
        return theme;
      })
      this.subscribedThemes$.next(updatedSubscribedThemes);
    })
  }

  onClickUnSubscribe(id: number):void {
    this.themeUnSubscription = this.themeService.unSubscribeToTheme(id).subscribe(() => {
      const updatedSubscribedThemes = this.subscribedThemes$.value.map((theme: DisplayThemes) => {
        if(theme.id == id)
          return {...theme, subscribed: false};
        
        return theme;
      })
      this.subscribedThemes$.next(updatedSubscribedThemes);
    })
  }

  isSubscribedToTheme(id: number): Observable<boolean> {
    return this.subscribedThemes$.pipe(
      map(themes => {
        const theme = themes.find(theme => theme.id === id); // Trouver le thème correspondant
        return theme ? theme.subscribed : false; // Retourner true ou false selon le cas
      })
    );
  }
  

  ngOnDestroy(): void {
    this.themeFetchSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
    this.themeUnSubscription.unsubscribe();
  }


}
