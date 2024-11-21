import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ArticlesComponent } from './components/articles/articles.component';
import { MddapiRoutingModule } from './mddapi-routing.module';
import { CreateComponent } from './components/create/create.component';
import { FormsModule } from '@angular/forms';
import { MeComponent } from './components/me/me.component';
import { ThemesComponent } from './components/themes/themes.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    CreateComponent,
    MeComponent,
    ThemesComponent,
    SingleArticleComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MddapiRoutingModule,
    FormsModule,
  ],
})
export class MddapiModule { 

}
