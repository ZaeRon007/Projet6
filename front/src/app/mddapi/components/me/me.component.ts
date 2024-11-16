import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userEntity } from 'src/app/core/models/userEntity';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private apiUrl = environment.baseUrl;
  
  user: userEntity = {name: "name", email: "email"};
  
  constructor(private http: HttpClient,
              private authService: AuthService){
  }

  ngOnInit(): void {
    this.http.get<userEntity>(`${this.apiUrl}auth/me`).subscribe((response : userEntity) => {
      this.user = response;
    });
  }

  onSubmit():void {
    // if(this.doesUserChanged(this.user)){
    this.http.put<userEntity>(`${this.apiUrl}profile/me`, this.user).subscribe();
    // }
  }

  logOut(): void {
    this.authService.logOut();
  }

  doesUserChanged(inputUser: userEntity): void {
  //   if(this.expectedUser.name != inputUser.name)
  //     return true;
  //   else if(this.expectedUser.email != inputUser.email)
  //     return true;
  //   else{
  //     console.log("nothing changed!!");
  //     return false;
  //   }
  }

}
