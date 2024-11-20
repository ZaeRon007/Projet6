import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, forkJoin, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { ArticleEntity } from "src/app/core/models/articleEntity";
import { SubscribeEntity } from "src/app/core/models/subscribeEntity";
import { environment } from "src/environments/environment.prod";
import { ThemeService } from "./themeService";
import { UserService } from "./userService";
import { DisplayArticle } from "src/app/core/models/dto/displayArticle";
import { CreateArticle } from "src/app/core/models/dto/createArticle";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiUrl = environment.baseUrl;
    private articles$ = new BehaviorSubject<ArticleEntity[]>([new ArticleEntity]);
    private article$ = new BehaviorSubject<ArticleEntity>(new ArticleEntity);
    private subscribes$ = new BehaviorSubject<SubscribeEntity[]>([new SubscribeEntity]);

    constructor(private http: HttpClient,
                private userService: UserService,
                private themeService: ThemeService) { }

    public getArticleById(id: number): Observable<ArticleEntity> {
        return this.http.get<ArticleEntity>(`${this.apiUrl}article/` + id).pipe(
            tap(article => this.article$.next(article))
        );
    }

    public getAllSubscribes(): Observable<SubscribeEntity[]> {
        return this.http.get<SubscribeEntity[]>(`${this.apiUrl}subscribes`).pipe(
            tap(themes => this.subscribes$.next(themes))
        )
    }

    public getArticlesByThemeId(id: number): Observable<ArticleEntity[]>{
        return this.http.get<ArticleEntity[]>(`${this.apiUrl}subscribes/theme/` + id).pipe(
            tap(article => this.articles$.next(article))
        );
    }

    public setupSingleArticle(id: string) {
        return this.getArticleById(Number.parseInt(id)).pipe(
              
              switchMap((article: ArticleEntity) => this.userService.getUsernameById(article.userId).pipe(
      
                    switchMap(username => this.themeService.getThemeNameById(article.themeId).pipe(
      
                        map(themeName => {
                          const displayArticle: DisplayArticle = new DisplayArticle();
                          displayArticle.id = article.id;
                          displayArticle.title = article.title;
                          displayArticle.content = article.content;
                          displayArticle.date = article.createdAt;
                          displayArticle.theme = themeName;
                          displayArticle.user = username;
                          return displayArticle; 
                        })
                      )
                    )
                  )
              )
          )
    }

    public setupArticles(){
        return this.getAllSubscribes().pipe(
            switchMap((subscriptions: SubscribeEntity[]) => {
              const subscriptions$ = subscriptions.map(subscription => this.getArticlesByThemeId(subscription.themeId).pipe(
                
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
          ); 
    }

    public createArticle(article: CreateArticle) {
        return this.http.post<CreateArticle>(`${this.apiUrl}article`, article)
    }
}