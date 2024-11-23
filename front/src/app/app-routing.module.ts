import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnAuthGuard } from './core/guards/unauth.guard';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [UnAuthGuard], data: {header: null}},
  { path: 'auth', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [UnAuthGuard], data: {header: 'simple'}},

  { path: 'articles', loadChildren: () => import('./mddapi/mddapi.module').then(m => m.MddapiModule), canActivate: [AuthGuard], data: {header: 'full'}},
  { path: 'profile', loadChildren: () => import('./mddapi/mddapi.module').then(m => m.MddapiModule), canActivate: [AuthGuard], data: {header: 'full'}},

  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
