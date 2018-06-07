import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { RecipeService} from './../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService,
              private recipeService:RecipeService,
              private router: Router) { }
              
  profile:any = {};
  recipes:any = [];
  
  ngOnInit() {
    let userid = this.profileService.getUserId();
    this.profileService.getPublicUserProfile(userid).subscribe(data => {
      this.profile = data;
    });
    this.recipeService.getRecipesFromUser(userid).subscribe(data => {
      this.recipes = data;
      console.log("recipies:", this.recipes);
    });
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
    return this.profileService.getUserId();
  }

  getUserRecipes(){
    return this.recipes ? this.recipes : [];
  }

  signOut(){
    this.profileService.signOut();
    this.router.navigateByUrl("/");
  }
}
