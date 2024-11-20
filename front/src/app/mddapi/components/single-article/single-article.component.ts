import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticleService } from '../../services/articlesService';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentEntity } from 'src/app/core/models/CommentEntity';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit, OnDestroy {
  article: DisplayArticle = new DisplayArticle;
  comments: CommentEntity[] = [new CommentEntity];
  private articleSubscription!: Subscription;
  private commentSubscription!: Subscription;


  constructor(private articleService: ArticleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.articleSubscription = this.articleService.setupSingleArticle(this.route.snapshot.paramMap.get('id')!).subscribe((displayArticle: DisplayArticle) => {
      this.article = displayArticle;
    });
  }

  // setupCommentList(): Subscription {
  //   return 
  // }

  ngOnDestroy(): void {
      this.articleSubscription.unsubscribe();
      // this.commentSubscription.unsubscribe();
  }

  

}
