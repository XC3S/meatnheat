import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private profileService:ProfileService,
              private router: Router) { }

  signInUserName:string;
  signInPassword:string;
  signInLoading:boolean = false;

  signUpUserName:string;
  signUpEmail:string;
  signUpPassword:string;
  signUpLoading:boolean = false;

  ngOnInit() {
  }

  signIn(){
    this.signInLoading = true;
    this.profileService.signIn(this.signInUserName,this.signInPassword,() => {
      this.signInLoading = false;
    },() => {
      this.signInLoading = false;
      this.router.navigateByUrl("/");
    });
  }

  signUp(){
    this.signUpLoading = true;
    this.profileService.signUp(this.signUpUserName,this.signUpEmail,this.signUpPassword,() => {
      this.signUpLoading = false;
    },() => {
      this.signUpLoading = false;
    });
  }
}
