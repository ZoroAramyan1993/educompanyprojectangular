import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../authentication/AuthService';
import {User} from '../model/User';
import {UserService} from '../service/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  @Input() loginForm;
  id: string;
  loginError = false;
  constructor(private  authService: AuthService, private userService: UserService, private router: Router, private location: Location) { }
  requireLogin = false;

  ngOnInit() {}

  onSubmit(userName: string, password: string){
    this.authService.signinUser(userName, password).subscribe(data => {
      if (data != null){
        this.requireLogin = true;
        this.userService.getUserByEmail(userName).subscribe(data1 => {
          if (data1 != null){
            this.user = data1;
            // console.log(data1.roles);
            // console.log(data1.roles[0]);
            // console.log(data1.roles[0]['name']);
            this.location.replaceState('/');
            this.router.navigate(['/home'], {queryParams: {id: data1.id, name: data1.name, email: data1.email, role: data1.roles[0]['name']}});
          }
        });



      }else{
        this.loginError = true;
      }
    });
  }

}
