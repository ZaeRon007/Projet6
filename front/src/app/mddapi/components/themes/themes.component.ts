import { Component, OnInit } from '@angular/core';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { ThemeService } from '../../services/themeService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { SubscribeEntity } from 'src/app/core/models/subscribeEntity';
import { ArticleService } from '../../services/articlesService';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  private apiUrl = environment.baseUrl;
  themes: themeEntity[] = [];
  subscribedSet$ = new BehaviorSubject<Set<number>>(new Set<number>());


  constructor(private themeService: ThemeService,
              private articleService: ArticleService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.themeService.fetch().subscribe((response: themeEntity[]) => {
      this.themes = response;
    });

    this.articleService.getAllSubscribes().subscribe((response: SubscribeEntity[]) => {
      const set = new Set(response.map(subscription => subscription.themeId));
      this.subscribedSet$.next(set);
    });
  }

  doesIdexist(id: number): boolean {
    const set = this.subscribedSet$.getValue();
    return set.has(id);
  }

  onClickSubscribe(id: number):void {
    this.http.post<void>(`${this.apiUrl}subscribe/` + id, null).subscribe(() => {
      const set = this.subscribedSet$.getValue();
      set.add(id);
      this.subscribedSet$.next(set);
    });
    
  }

  onClickUnSubscribe(id: number):void {
    this.http.post<void>(`${this.apiUrl}unsubscribe/` + id, null).subscribe(() => {
      const set = this.subscribedSet$.getValue();
      set.delete(id);
      this.subscribedSet$.next(set);
    });
    
  }


}
