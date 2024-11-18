import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../../services/articlesService';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { ArticleEntity } from 'src/app/core/models/articleEntity';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit, OnDestroy {
  private apiUrl = environment.baseUrl;
  article: DisplayArticle = new DisplayArticle;
  private sub!: Subscription;


  constructor(private http: HttpClient,
              private articleService: ArticleService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.articleService.getArticleById(
      Number.parseInt(this.route.snapshot.paramMap.get('id')!)).pipe(
        switchMap((article: ArticleEntity) =>
            this.userService.getUsernameById(article.userId).pipe(
              map(username => {
                const displayArticle: DisplayArticle = new DisplayArticle();
                displayArticle.id = article.id;
                displayArticle.title = article.title;
                displayArticle.content = article.content;
                displayArticle.date = article.createdAt;
                displayArticle.theme = "#TODO";
                displayArticle.user = username;
                return displayArticle; 
              })
            )
        )
    ).subscribe((displayArticle: DisplayArticle) => {
        this.article = displayArticle;
      });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
