import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articlesService';
import { getArticle } from 'src/app/core/models/dto/getArticle';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/userService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: getArticle[] = [];
  private sub!: Subscription;

  constructor(private router: Router,
              private articleService: ArticleService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this.articleService.fetch().subscribe((articles: getArticle[]) => {
      this.articles = articles;

      console.log(articles);
    })
  }

  getUserById(id: number){
    return this.userService.getUserById(id).subscribe();
  }

  create(): void {
    this.router.navigateByUrl('articles/create');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}
