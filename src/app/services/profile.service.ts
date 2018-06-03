import * as AWS from 'aws-sdk';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {
  AuthenticationDetails,
  IAuthenticationDetailsData,
  CognitoIdentityServiceProvider,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
  ICognitoUserData,
  ICognitoUserAttributeData
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";
import { CookieService } from "../services/cookie.service";

@Injectable()
export class ProfileService {
  jwtToken:any;
  userPool:CognitoUserPool;
  username:string;
  userid:string;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor(
    private http: HttpClient,
    private cookieService:CookieService
  ) {
    this.userPool = new CognitoUserPool(this.poolData);
    if(this.cookieService.getCookie("token")){
      this.jwtToken = this.cookieService.getCookie("token");
    }
    if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
    }
    if(localStorage.getItem("userid")){
      this.userid = localStorage.getItem("userid");
    }
  }

  signIn(username:string,password:string,failure,success):void {
    const authenticationData:IAuthenticationDetailsData = {
      Username: username,
      Password: password
    }
    const authenticationDetails:AuthenticationDetails = new AuthenticationDetails(authenticationData);

    const cognitoUserData:ICognitoUserData = {
      Username: username,
      Pool: this.userPool
    }

    const cognitoUser:CognitoUser = new CognitoUser(cognitoUserData);

    

    cognitoUser.authenticateUser(authenticationDetails,{
      onSuccess: (result) => {
        cognitoUser.getUserAttributes((err,attrs:CognitoUserAttribute[]) => {
          attrs.forEach((attr:CognitoUserAttribute) => {
            if(attr.getName() == "sub"){
              this.userid = attr.getValue();
              localStorage.setItem("userid",this.userid);
            }
          });
        });

        console.log("login result:",this.userid);
        console.log('access token + ' + result.getIdToken().getJwtToken());
        this.username = username;
        localStorage.setItem("username",this.username);
        this.jwtToken = result.getIdToken().getJwtToken();
        this.cookieService.setCookie("token",this.jwtToken,365);
        success();
      },
      onFailure: (error) => {
        alert(error);
        failure();
      }
    });
  }

  signUp(username:string,email:string,password:string,failure,success):void{
    const emailData:ICognitoUserAttributeData = {
      Name: 'email',
      Value: email
    } 

    const emailAttribute:CognitoUserAttribute = new CognitoUserAttribute(emailData);

    let attributeList:CognitoUserAttribute[] = [
      emailAttribute
    ];

    this.userPool.signUp(username,password,attributeList,null,(error,result) => {
      console.log(username,password,attributeList);
      if(error){
        alert(error);
        failure();
      }
      else {
        alert("Willkommen! Du hast eine email mit einem Aktivierungslink bekommen");
        success();
      }
    });
  };

  getPublicUserProfile(userid:string):any {
    return this.http.get("https://jbfzhbbbkl.execute-api.eu-central-1.amazonaws.com/prod/profile/" + this.userid);
  }

  isLoggedIn():boolean {
    return !!this.jwtToken;
  }

  getUsername():string {
    return this.username || "";
  }

  getUserId():string {
    return this.userid || "";
  }

}