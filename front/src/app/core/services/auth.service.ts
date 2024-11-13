import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    param: string = 'access_token';

    constructor(private router: Router){
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
}