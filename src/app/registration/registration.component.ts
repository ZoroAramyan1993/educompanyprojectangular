import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from '../authentication/AuthService';
import {Applicant} from '../model/Appicant';
import {User} from '../model/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public applicant: Applicant;
  public successMessage: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  @Input() registrationForm;

  ngOnInit() {
  }

  submitted = false;

  onSubmit(registrationForm: User) {
    this.authService.signupUser(registrationForm).subscribe(data => {
      if(data != null){
        this.submitted = true;
        this.successMessage = 'You are successfully registrated';
      }
    });
  }
}
