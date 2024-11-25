import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import { RouterModule } from '@angular/router';
import { HttpInterceptorProviders } from './interceptors';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { UnAuthGuard } from './guards/unauth.guard';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserAuthenticationComponent } from './components/user-authentication/user-authentication.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SimpleHeaderComponent } from './components/headers/simple-header/simple-header.component';
import { FullHeaderComponent } from './components/headers/full-header/full-header.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    NotFoundComponent,
    UserAuthenticationComponent,
    UserLoginComponent,
    UserRegisterComponent,
    SimpleHeaderComponent,
    FullHeaderComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AuthGuard,
    UnAuthGuard,
    HttpInterceptorProviders
  ],
  exports: [
    LandingPageComponent,
    NotFoundComponent,
    UserAuthenticationComponent,
    UserLoginComponent,
    UserRegisterComponent,
    SimpleHeaderComponent,
    FullHeaderComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CoreModule { 
  constructor(){
    registerLocaleData(fr.default)
  }
}
