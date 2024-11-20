import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articlesService';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/userService';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';
import { ArticleEntity } from 'src/app/core/models/articleEntity';
import { SubscribeEntity } from 'src/app/core/models/subscribeEntity';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: DisplayArticle[] = [];
  private sub!: Subscription;
  ascendant: boolean = true;

  constructor(private router: Router,
              private articleService: ArticleService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.setupDisplayArticles();
  }

  setupDisplayArticles(): Subscription {
    return this.articleService.getAllSubscribes().pipe(
      switchMap((subscriptions: SubscribeEntity[]) => {
        const subscriptions$ = subscriptions.map(subscription => this.articleService.getArticlesByThemeId(subscription.themeId).pipe(
          
          switchMap((articles: ArticleEntity[]) => {
            const displayArticle$ = articles.map(article => this.userService.getUsernameById(article.userId).pipe(
              map(username => {
                const displayArticle: DisplayArticle = new DisplayArticle();
                displayArticle.id = article.id;
                displayArticle.title = article.title;
                displayArticle.content = article.content;
                displayArticle.date = article.createdAt;
                displayArticle.user = username;
                return displayArticle;
              })
            ));
            return forkJoin(displayArticle$);
          })
        ));
        return forkJoin(subscriptions$);

      }),
      map((nestedArticles: DisplayArticle[][]) => {
        return nestedArticles.flat();// Aplatissement des tableaux imbriqués
      })
    ).subscribe((displayArticles: DisplayArticle[]) => {
        this.articles = displayArticles;
    });
  }

  create(): void {
    this.router.navigateByUrl('articles/create');
  }

  sortByDate(): void{
    if(this.ascendant){
      this.articles.sort((a,b) => {
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;
      })
      this.ascendant = !this.ascendant;
    }
    else {
      this.articles.sort((a,b) => {
        if(a.date < b.date) return 1;
        if(a.date > b.date) return -1;
        return 0;
      })
      this.ascendant = !this.ascendant;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}
