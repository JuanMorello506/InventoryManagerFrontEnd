import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { LoginSignIn } from './pages/login-sign-in/login-sign-in';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'login-sign-in', component: LoginSignIn },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
