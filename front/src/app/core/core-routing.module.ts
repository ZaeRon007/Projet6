import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { userAuthenticationComponent } from "./components/userAuthentication/userAuthentication.component";
import { userLoginComponent } from "./components/userLogin/userLogin.component";
import { userRegisterComponent } from "./components/userRegister/userRegister.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
    { path: '', component: userAuthenticationComponent},
    { path: 'register', component: userRegisterComponent},
    { path: 'login', component: userLoginComponent},
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