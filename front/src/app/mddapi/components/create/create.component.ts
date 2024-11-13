import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/interface/article.interface';
import { theme } from 'src/app/core/interface/theme.interface';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private apiUrl = environment.baseUrl;

  monFormulaire: FormGroup;
  title!: string;
  content!: string;
  options: theme[] | undefined;

  constructor(private router: Router,
              private httpclient: HttpClient,
              private formBuilder: FormBuilder) 
    {    
      this.monFormulaire = this.formBuilder.group({
        options: ['', Validators.required],
        title: ['', Validators.required],
        content: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.title = "";
    this.content = "";
  }

  onClick(): void {
    this.httpclient.get<theme[]>(`${this.apiUrl}themes`).subscribe((response: theme[]) => {
      this.options = response;
  });
  }

  onSubmit(){
    if(this.monFormulaire.valid){
      let article = this.monFormulaire.value as Article;
      this.httpclient.post<Article>(`${this.apiUrl}articles`, article).subscribe();
    }

    this.router.navigateByUrl('/articles/home');
  }

}
