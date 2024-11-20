import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userEntity } from 'src/app/core/models/userEntity';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { ArticleService } from '../../services/articlesService';
import { SubscribeEntity } from 'src/app/core/models/subscribeEntity';
import { BehaviorSubject, forkJoin, map, switchMap } from 'rxjs';
import { ThemeService } from '../../services/themeService';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  private apiUrl = environment.baseUrl;
  displayThemes: DisplayThemes[] = [new DisplayThemes()];
  
  user: userEntity = {name: "name", email: "email"};
  
  constructor(private http: HttpClient,
              private authService: AuthService,
              private articleService: ArticleService,
              private themeService: ThemeService){
  }

  ngOnInit(): void {
    this.http.get<userEntity>(`${this.apiUrl}auth/me`).subscribe((response : userEntity) => {
      this.user = response;
    });

    this.articleService.getAllSubscribes().pipe(
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
    ).subscribe((response: DisplayThemes[]) => {
      this.displayThemes = response;
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

  onClickUnSubscribe(id: number):void {
    this.http.post<void>(`${this.apiUrl}unsubscribe/` + id, null).subscribe();
    
  }

}
