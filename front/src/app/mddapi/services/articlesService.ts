import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ArticleEntity } from "src/app/core/models/articleEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ArticleService implements OnInit{
    private apiUrl = environment.baseUrl;
    private article$ = new BehaviorSubject<ArticleEntity[]>([new ArticleEntity]);

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.fetch();
    }

    public fetch(): Observable<ArticleEntity[]> {
        return this.http.get<ArticleEntity[]>(`${this.apiUrl}articles`).pipe(
            tap(articles => this.article$.next(articles)));
    }
}