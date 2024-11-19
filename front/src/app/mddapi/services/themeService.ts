import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { themeEntity } from "src/app/core/models/themeEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnInit{
    private apiUrl = environment.baseUrl;
    private themes$ = new BehaviorSubject<themeEntity[]>([new themeEntity]);
    private theme$ = new BehaviorSubject<themeEntity>(new themeEntity);

    constructor(private http: HttpClient){}

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
}