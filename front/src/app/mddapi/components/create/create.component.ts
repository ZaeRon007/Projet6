import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { environment } from 'src/environments/environment.prod';
import { ThemeService } from '../../services/themeService';
import { CreateArticle } from 'src/app/core/models/dto/createArticle';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private apiUrl = environment.baseUrl;

  options: themeEntity[] = [];
  article: CreateArticle = new CreateArticle;

  constructor(private router: Router,
              private httpclient: HttpClient,
              private themeService: ThemeService) {    
   }

  ngOnInit(): void {
    this.themeService.fetch().subscribe((themes: themeEntity[]) => {
      this.options = themes;
    })
  }

  onSubmit(){
    this.httpclient.post<CreateArticle>(`${this.apiUrl}article`, this.article).subscribe();
    this.router.navigateByUrl('/articles/home');
  }

}
