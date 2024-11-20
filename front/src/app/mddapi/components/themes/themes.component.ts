import { Component, OnDestroy, OnInit } from '@angular/core';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { ThemeService } from '../../services/themeService';
import { SubscribeEntity } from 'src/app/core/models/subscribeEntity';
import { ArticleService } from '../../services/articlesService';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, OnDestroy {
  themes: themeEntity[] = [];
  subscribedSet$ = new BehaviorSubject<Set<number>>(new Set<number>());
  themeFetchSubscription: Subscription = new Subscription();
  themeSubscriptionList: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();
  themeUnSubscription: Subscription = new Subscription();


  constructor(private themeService: ThemeService,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.themeFetchSubscription = this.themeService.fetch().subscribe((response: themeEntity[]) => {
      this.themes = response;
    });

    this.themeSubscriptionList = this.articleService.getSubscriptionListForUser().subscribe((response: SubscribeEntity[]) => {
      const set = new Set(response.map(subscription => subscription.themeId));
      this.subscribedSet$.next(set);
    });
  }

  doesIdexist(id: number): boolean {
    const set = this.subscribedSet$.getValue();
    return set.has(id);
  }

  onClickSubscribe(id: number):void {
    this.themeSubscription = this.themeService.subscribeToTheme(id).subscribe(() => {
      const set = this.subscribedSet$.getValue();
      set.add(id);
      this.subscribedSet$.next(set);
    });
    
  }

  onClickUnSubscribe(id: number):void {
    this.themeUnSubscription = this.themeService.unSubscribeToTheme(id).subscribe(() => {
      const set = this.subscribedSet$.getValue();
      set.delete(id);
      this.subscribedSet$.next(set);
    });
    
  }

  ngOnDestroy(): void {
    this.themeFetchSubscription.unsubscribe();
    this.themeSubscriptionList.unsubscribe();
    this.themeSubscription.unsubscribe();
    this.themeUnSubscription.unsubscribe();
  }


}
