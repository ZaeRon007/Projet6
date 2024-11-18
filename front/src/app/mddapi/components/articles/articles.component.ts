import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articlesService';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/userService';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';
import { ArticleEntity } from 'src/app/core/models/articleEntity';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: DisplayArticle[] = [];
  private sub!: Subscription;

  constructor(private router: Router,
              private articleService: ArticleService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.articleService.fetch().pipe(
      switchMap((response: ArticleEntity[]) => {
        const displayArticles$ = response.map(article =>
          this.userService.getUsernameById(article.userId).pipe(
            map(username => {
              const displayArticle: DisplayArticle = new DisplayArticle();
              displayArticle.title = article.title;
              displayArticle.content = article.content;
              displayArticle.date = article.createdAt;
              displayArticle.user = username;
              return displayArticle;
            })
          )
        );
        return forkJoin(displayArticles$);
      })
    ).subscribe((displayArticles: DisplayArticle[]) => {
        this.articles = displayArticles;
    });
  }

  create(): void {
    this.router.navigateByUrl('articles/create');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}
