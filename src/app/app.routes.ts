import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { LogIn } from './pages/logIn/logIn';
import { SignIn } from './pages/signIn/signIn';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'logIn', component: LogIn },
      { path: 'signIn', component: SignIn },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
