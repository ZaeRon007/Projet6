import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthRequest } from "../models/auth.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.baseUrl;
    param: string = 'access_token';

    constructor(private router: Router,
                private http: HttpClient){
    }

    getToken(){
        return localStorage.getItem(this.param);
    }
    
    setToken(token: string) {
        localStorage.setItem(this.param, token);
    }

    isLoggedIn() : boolean {
        if(this.getToken()){
            return true;
        }
        
        return false;
    }

    isLoggedOut() : boolean {
        if(this.getToken() == null){
            return true;
        }
        return false;
    }

    logOut(){
        let removeItem = localStorage.removeItem(this.param);
        if( removeItem == null)
            this.router.navigateByUrl('');
    }

    logInUser(user: AuthRequest) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.apiUrl}auth/register`, user, {headers});
    }
}