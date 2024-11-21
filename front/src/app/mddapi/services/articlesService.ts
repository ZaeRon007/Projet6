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
import { DisplayThemes } from "src/app/core/models/dto/displayTheme";
import { themeEntity } from "src/app/core/models/themeEntity";

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

    public isSubscribedToTheme(id: number) {
      return this.http.get<boolean>(`${this.apiUrl}subscribe/` + id);
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

    public setupThemeSubscriptionDisplay() {
        return this.getAllSubscribes().pipe(
            switchMap((response: SubscribeEntity[]) => {
              const displayThemes$ = response.map(theme => 
                this.themeService.getThemeById(theme.themeId).pipe(
                  map(res => {
                    const displayThemes: DisplayThemes = new DisplayThemes();
                    displayThemes.id = res.id;
                    displayThemes.title = res.name;
                    displayThemes.content = res.content;
                    return displayThemes;
                  })
                )
              );
            return forkJoin(displayThemes$);
            })
          );
    }

    // public getSubscriptionListForUser() {
    //     return this.getAllSubscribes().pipe(
    //   map((subscriptions: SubscribeEntity[]) => {
    //     return subscriptions.map(subcription => subcription.themeId);
    //   })
    // );
    // }

    public setupDisplayThemes() {
      return this.themeService.fetch().pipe(
        switchMap((themes: themeEntity[]) => {
          const themes$ = themes.map(theme => this.isSubscribedToTheme(theme.id).pipe(

            map(truth => {
              const displayTheme: DisplayThemes = new DisplayThemes();
              displayTheme.id = theme.id;
              displayTheme.title = theme.name;
              displayTheme.content = theme.content;
              displayTheme.subscribed = truth;
              return displayTheme;
            })
            
          ));
          return forkJoin(themes$);
        })
      )
    }
}