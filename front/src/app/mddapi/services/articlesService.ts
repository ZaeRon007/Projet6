import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ArticleEntity } from "src/app/core/models/articleEntity";
import { SubscribeEntity } from "src/app/core/models/subscribeEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ArticleService implements OnInit{
    private apiUrl = environment.baseUrl;
    private articles$ = new BehaviorSubject<ArticleEntity[]>([new ArticleEntity]);
    private article$ = new BehaviorSubject<ArticleEntity>(new ArticleEntity);
    private subscribes$ = new BehaviorSubject<SubscribeEntity[]>([new SubscribeEntity]);

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.fetch();
    }

    public fetch(): Observable<ArticleEntity[]> {
        return this.http.get<ArticleEntity[]>(`${this.apiUrl}articles`).pipe(
            tap(articles => this.articles$.next(articles)));
    }

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
}