import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { RecipeService} from './../services/recipe.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService,
              private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }
              
  profile:any = {};
  recipes:any = [];
  userId:string = "";
  ngOnInit() {
    this.profileService.checkCognitoUser(()=>{
      this.route.params.subscribe(params => {
        this.userId = params.userId;
        if(this.userId == this.profileService.getCognitoUserId()){
          //@TODO: load a private profile here
          this.profileService.getPublicUserProfile(this.profileService.getCognitoUserId()).subscribe(data => {
            this.profile = data;
          });    
        }
        else {
          this.profileService.getPublicUserProfile(this.userId).subscribe(data => {
            this.profile = data;
          });
        }
        this.recipeService.getRecipesFromUser(this.userId).subscribe(data => {
          this.recipes = data;
          console.log("recipies:", this.recipes);
        });
      });
    });
  }

  isMyProfile(){
    if(!this.profileService.isLoggedIn()) return false;
    return this.userId == this.profileService.getCognitoUserId();
  }

  getUserName(){
    // return a formatted username
    return this.profile.UserName ? (this.profile.UserName.charAt(0).toUpperCase() + this.profile.UserName.slice(1)) : "";
  }

  getUserImage(){
    // return the profile piction with a default picture as fallback
    return this.profile.UserImage ? this.profile.UserImage : "https://i.stack.imgur.com/l60Hf.png";
  }

  getUserId(){
    return this.profileService.getCognitoUserId();
  }

  getUserRecipes(){
    return this.recipes ? this.recipes : [];
  }

  signOut(){
    this.profileService.signOut();
    this.router.navigateByUrl("/");
  }
}
