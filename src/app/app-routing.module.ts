import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRedirectGuard } from './authentication/login-redirect.guard';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './shared/Guard/auth-guard';

const routes: Routes = [{
  path: '', redirectTo: 'login', pathMatch: 'full'
}, {
  path: 'login', canActivate: [LoginRedirectGuard], loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
},
{
  path: '',
  canActivateChild: [AuthGuard],
  component: PagesComponent,
  children: [
    { path: 'product-info', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },

  ],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
