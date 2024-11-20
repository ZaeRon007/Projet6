import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { DisplayThemes } from "src/app/core/models/dto/displayTheme";
import { SubscribeEntity } from "src/app/core/models/subscribeEntity";
import { themeEntity } from "src/app/core/models/themeEntity";
import { environment } from "src/environments/environment.prod";
import { ArticleService } from "./articlesService";

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnInit{
    private apiUrl = environment.baseUrl;
    private themes$ = new BehaviorSubject<themeEntity[]>([new themeEntity]);
    private theme$ = new BehaviorSubject<themeEntity>(new themeEntity);

    constructor(private http: HttpClient,
                private themeService: ThemeService,
                private articleService: ArticleService){}

    ngOnInit(): void {
        this.fetch();
    }

    public fetch(): Observable<themeEntity[]> {
        return this.http.get<themeEntity[]>(`${this.apiUrl}themes`).pipe(
            tap(themes => this.themes$.next(themes)));
    }

    public getThemeById(id: Number): Observable<themeEntity> {
        return this.http.get<themeEntity>(`${this.apiUrl}theme/` + id).pipe(
            tap(theme => this.theme$.next(theme)));
    }

    public getThemeNameById(id: Number): Observable<string> {
        return this.getThemeById(id).pipe(
            map(theme => theme.name)
        );
    }

    public subscribeToTheme(id: number){
        return this.http.post<void>(`${this.apiUrl}subscribe/` + id, null);
    }

    public unSubscribeToTheme(id: number){
        return this.http.post<void>(`${this.apiUrl}unsubscribe/` + id, null);
    }

    public setupThemeSubscriptionDisplay() {
        return this.articleService.getAllSubscribes().pipe(
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

    public getSubscriptionListForUser() {
        return this.articleService.getAllSubscribes();
    }
}