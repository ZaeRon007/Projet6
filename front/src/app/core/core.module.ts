import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpInterceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { userAuthenticationComponent } from './components/userAuthentication/userAuthentication.component';
import { userLoginComponent } from './components/userLogin/userLogin.component';
import { userRegisterComponent } from './components/userRegister/userRegister.component';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { UnAuthGuard } from './guards/unauth.guard';


@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent,
    userAuthenticationComponent,
    userLoginComponent,
    userRegisterComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AuthGuard,
    UnAuthGuard,
    HttpInterceptorProviders
  ],
  exports: [
    HeaderComponent,
    LandingPageComponent,
    userAuthenticationComponent,
    userLoginComponent,
    userRegisterComponent,
  ]
})
export class CoreModule { 
  constructor(){
    registerLocaleData(fr.default)
  }
}
