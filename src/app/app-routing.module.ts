import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards/AuthGuard';
import {BoardComponent} from './board/board.component';

const routes: Routes = [
  {path: '', redirectTo:'/board',pathMatch: 'full' },
  {path: 'home',
    component: HomeComponent,
    data: {requireLogin: true},
    canActivate: [AuthGuard]
    },
  {path: 'login', component: LoginComponent},
  {path: 'board', component: BoardComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
