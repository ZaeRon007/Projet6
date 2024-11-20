import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CommentEntity } from "src/app/core/models/CommentEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = environment.baseUrl;
    private comments$ = new BehaviorSubject<CommentEntity[]>([new CommentEntity]);

    constructor(private http: HttpClient){}

    public getCommentsByArticleId(id: number): Observable<CommentEntity[]> {
        return this.http.get<CommentEntity[]>(`${this.apiUrl}comment/article/` + id).pipe(
            tap(comments => this.comments$.next(comments))
        );
    }
}