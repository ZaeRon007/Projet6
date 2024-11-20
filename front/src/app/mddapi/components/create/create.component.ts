import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { ThemeService } from '../../services/themeService';
import { CreateArticle } from 'src/app/core/models/dto/createArticle';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/articlesService';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  options: themeEntity[] = [];
  article: CreateArticle = new CreateArticle;
  themeSubscribe!: Subscription;
  postSubscribe!: Subscription;

  constructor(private router: Router,
              private articleService: ArticleService,
              private themeService: ThemeService) {    
   }

  ngOnInit(): void {
    this.themeSubscribe = this.themeService.fetch().subscribe((themes: themeEntity[]) => {
      this.options = themes;
    })
  }
  
  onSubmit(): void {
    this.postSubscribe = this.articleService.createArticle(this.article).subscribe(() => {
      this.router.navigateByUrl('/articles/home');
    });
  }
  ngOnDestroy(): void {
      this.themeSubscribe.unsubscribe();
      this.postSubscribe.unsubscribe();
  }


}
