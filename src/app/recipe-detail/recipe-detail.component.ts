import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeDetailComponent implements OnInit {

  recipe:any;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.requestRecipe();
  }

  requestRecipe(){
    this.route.params.subscribe(params => {
      this.recipeService.getRecipe(params.userId,params.recipeId).subscribe(data => {
        console.log("loaded recipe details:",data);
        this.recipe = data;
      });
    });
  }

  getTitle(){
    if(!this.recipe) return null;
    return this.recipe.Title;
  }

  getAuthorName(){
    if(!this.recipe) return null;
    return this.recipe.Username;
  }

  getAuthorId(){
    if(!this.recipe) return null;
    return this.recipe.UserId;
  }

  getDifficulty(){
    if(!this.recipe) return null;
    return this.recipe.Difficulty;
  }

  getPreperationTime(){
    if(!this.recipe) return null;
    return this.recipe.PreperationTime;
  }

  getImage(){
    if(!this.recipe) return "https://erconsult.com.au/wp-content/uploads/2015/04/placeholder-600x400.png";
    return this.recipe.Image;
  }

  getSteps(){
    if(!this.recipe) return [];
    return this.recipe.Steps;
  }

  getIngredients(){
    if(!this.recipe) return [];
    return this.recipe.Ingredients;
  }
}
