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
  ICognitoUserAttributeData,
  CognitoIdToken
} from 'amazon-cognito-identity-js';
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";
import { CookieService } from "../services/cookie.service";

@Injectable()
export class ProfileService {
  userPool:CognitoUserPool;
  user:CognitoUser;
  userAttributes:CognitoUserAttribute[] = [];
  idToken:CognitoIdToken;

  poolData:ICognitoUserPoolData = {
    UserPoolId : 'eu-central-1_LaVer2K0o',
    ClientId : '5d9sc5ijad1fn4qimlqefb6ar5'
  };

  constructor(
    private http: HttpClient,
    private cookieService:CookieService
  ) {
    this.userPool = new CognitoUserPool(this.poolData);
    this.updateSession();
  }

  updateSession(callback?){
    this.user = this.userPool.getCurrentUser();

    if(this.user) {
      this.user.getSession((err, session) => {
        if (err) {
           alert(err);
            return;
        }

        this.idToken = session.getIdToken();
        console.log("idToken:",this.idToken);

        this.user.getUserAttributes((err,attrs:CognitoUserAttribute[]) => {
          this.userAttributes = attrs;
          console.log("logged in as: ",this.user);
          console.log("with attributes:",this.userAttributes);
          if(callback) callback();
        });
      });
    }
  }

  getCognitoAttribute(name:string){
    var result;
    this.userAttributes.forEach((entry:CognitoUserAttribute) => {
      if (entry.getName() == name) result = entry.getValue();
    });
    return result;
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
        this.updateSession(success);
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
      
      // @TODO: the results contains the cognito User object... so maybe presign-in the user before he verified his email

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

  signOut(){
    this.user.signOut();
    this.user = null;
    this.userAttributes = [];
    this.idToken = null;
  }

  getPublicUserProfile(userid:string):any {
    return this.http.get("https://jbfzhbbbkl.execute-api.eu-central-1.amazonaws.com/prod/profile/" + this.getUserId());
  }

  isLoggedIn():boolean {
    return !!this.user;
  }

  getAuthorizer() {
    return this.idToken.getJwtToken();
  }

  getUsername():string {
    return this.user.getUsername() || "";
  }

  getUserId():string {
    return this.getCognitoAttribute("sub") || "";
  }

}