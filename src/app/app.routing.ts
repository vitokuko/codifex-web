/**
 * Created by souaibou on 13/01/2018.
 */
/**
 * Created by souaibou on 12/01/2018.
 */
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./auth/register/register.component";


const APP_ROUTES : Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  { path:'home', component: HomeComponent},
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
