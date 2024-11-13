import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { themeEntity } from "src/app/core/interface/themeEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnInit{
    private apiUrl = environment.baseUrl;
    private theme$ = new BehaviorSubject<themeEntity[]>([new themeEntity]);

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.fetch();
    }

    public fetch(): Observable<themeEntity[]> {
        return this.http.get<themeEntity[]>(`${this.apiUrl}themes`).pipe(
            tap(themes => this.theme$.next(themes)));
    }

    public getThemes(): Observable<themeEntity[]>{
        return this.theme$.asObservable();
    }
}