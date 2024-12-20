import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articlesService';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { CommentService } from '../../services/commentService';
import { DisplayComment } from 'src/app/core/models/dto/displayComment';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit, OnDestroy {
  article: DisplayArticle = new DisplayArticle;
  comments$ = new BehaviorSubject<DisplayComment[]>([]);
  comment: DisplayComment = new DisplayComment();
  private articleSubscription: Subscription = new Subscription();
  private commentSubscription: Subscription = new Subscription();
  private commentCreationSubscription: Subscription = new Subscription();

  ID = this.route.snapshot.paramMap.get('id');


  constructor(private articleService: ArticleService,
              private commentService: CommentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.articleSubscription = this.articleService.setupSingleArticle(this.ID!.toString()).subscribe((displayArticle: DisplayArticle) => {
      this.article = displayArticle;
    });

    this.commentSubscription = this.commentService.getCommentsByArticleId(Number.parseInt(this.ID!)).pipe(
      tap(comment => this.comments$.next(comment))).subscribe();
  }

  onSubmit(): void {
    if(!!this.comment.content){
      this.commentCreationSubscription = this.commentService.postComment(Number.parseInt(this.ID!), this.comment.content).subscribe((newComment: DisplayComment) => {
        const updatedComments = this.comments$.getValue();
        updatedComments.push(newComment);
        this.comments$.next(updatedComments);
  
        this.comment = new DisplayComment();
      });
    }
  }

  ngOnDestroy(): void {
      this.articleSubscription.unsubscribe();
      this.commentSubscription.unsubscribe();
      this.commentCreationSubscription.unsubscribe();
  }



}
