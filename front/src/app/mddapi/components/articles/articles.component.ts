import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articlesService';
import { Subscription } from 'rxjs';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';

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
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.sub = this.articleService.setupArticles().subscribe((displayArticles: DisplayArticle[]) => {
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
