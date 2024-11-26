import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthRequest } from "../models/auth.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.baseUrl;
    param: string = 'access_token';

    constructor(private router: Router,
        private http: HttpClient) {
    }

    /**
     * Get user token
     * @returns token string
     */
    getToken() {
        return localStorage.getItem(this.param);
    }

    /**
     * Set user token
     * @param token token to set
     */
    setToken(token: string) {
        localStorage.setItem(this.param, token);
    }

    /**
     * Use to know if user is connected
     * @returns boolean
     */
    isLoggedIn(): boolean {
        if (this.getToken()) {
            return true;
        }

        return false;
    }

    /**
     * Use to know if user is disconnected
     * @returns boolean
     */
    isLoggedOut(): boolean {
        if (this.getToken() == null) {
            return true;
        }
        return false;
    }

    /**
     * Force user logOut
     */
    logOut() {
        let removeItem = localStorage.removeItem(this.param);
        if (removeItem == null)
            this.router.navigateByUrl('');
    }

    /**
     * Permit to register a new user
     * @param user : user credentials
     * @returns Observable<AuthRequest>
     */
    registerUser(user: AuthRequest): Observable<AuthRequest> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<AuthRequest>(`${this.apiUrl}auth/register`, user, { headers });
    }

    /**
     * Permit to login user
     * @param user : user credentials
     * @returns Observable<AuthRequest>
     */
    loginUser(user: AuthRequest): Observable<AuthRequest> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<AuthRequest>(`${this.apiUrl}auth/login`, user, { headers });
    }
}