import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { userEntity } from "src/app/core/models/userEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.baseUrl;
    private user$ = new BehaviorSubject<userEntity>(new userEntity);

    constructor(private http: HttpClient){}
    
    public getUserById(id: Number): Observable<userEntity> {
        return this.http.get<userEntity>(`${this.apiUrl}user/` + id).pipe(
            tap(user => this.user$.next(user)));
    }

    public getUsernameById(id: Number): Observable<string> {
        return this.getUserById(id).pipe(
            map(user => user.name)
        );
    }
}