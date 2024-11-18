import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticlesComponent } from "./components/articles/articles.component";
import { CreateComponent } from "./components/create/create.component";
import { MeComponent } from "./components/me/me.component";
import { ThemesComponent } from "./components/themes/themes.component";
import { SingleArticleComponent } from "./components/single-article/single-article.component";

const routes: Routes = [
    { path: 'home', component: ArticlesComponent},
    { path: 'me', component: MeComponent},
    { path: 'create', component: CreateComponent},
    { path: 'themes', component: ThemesComponent},
    { path: 'view/:id', component: SingleArticleComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class MddapiRoutingModule {

}