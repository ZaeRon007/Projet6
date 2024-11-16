import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ArticlesComponent } from './components/articles/articles.component';
import { MddapiRoutingModule } from './mddapi-routing.module';
import { CreateComponent } from './components/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MeComponent } from './components/me/me.component';
import { ThemesComponent } from './components/themes/themes.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ArticlesComponent,
    CreateComponent,
    MeComponent,
    ThemesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MddapiRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
  ],
})
export class MddapiModule { 

}
