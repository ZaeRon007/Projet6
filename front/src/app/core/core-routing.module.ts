import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { UserRegisterComponent } from "./components/user-register/user-register.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserAuthenticationComponent } from "./components/user-authentication/user-authentication.component";

const routes: Routes = [
    { path: '', component: UserAuthenticationComponent},
    { path: 'register', component: UserRegisterComponent},
    { path: 'login', component: UserLoginComponent},
    { path: '404', component: NotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ] 
})
export class CoreRoutingModule{

}