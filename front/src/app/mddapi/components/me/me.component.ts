import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/core/interface/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private apiUrl = environment.baseUrl;
  
  monFormulaire!: FormGroup;
  user!: user;
  
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private authService: AuthService){
    
    
    // this.user.email = "test@gmail.com";
    // this.user.name = "xXpedroXx";

    this.monFormulaire = formBuilder.group({
      username: ["this.user.name"],
      email: ["this.user.email"],
    })
  }

  ngOnInit(): void {
    this.http.get<user>(`${this.apiUrl}auth/me`).subscribe((response : user) => {
      this.user = response as user;
      this.monFormulaire = this.formBuilder.group({
        username: [this.user.name, [Validators.required]],
        email: [this.user.email, Validators.required, Validators.email],
        })
    });
  }

  onSubmit():void {
    this.http.put<user>(`${this.apiUrl}profile/me`, this.user).subscribe();
  }

  logOut(): void {
    this.authService.logOut();
  }

}
