import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from '../services/search.service';
@Component({
  selector: 'app-recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeCarouselComponent implements OnInit {

  constructor(private searchservice:SearchService) { }

  recipes:any[];
  title:string;

  ngOnInit() {
    // mock data
    this.title = "Recommended For Your"
    /*
    this.recipes = [
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      },
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      },
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      },
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      },
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      },
      {
        "UserId": "fc7e25f0-a91e-4bbd-941d-ed79b98790e6",
        "RecipeId": "1516568590567_7823819454475502_912036652144331_19568893761321227",
        "Image": "https://www.digitalphotomentor.com/photography/2014/10/food-photography-french-toast-nicole-young.jpg"
      }
    ]
    */

    this.searchservice.processSearch("*").subscribe(data => {
      this.recipes = data["hits"]["hits"].reverse();
      console.log(this.recipes);
  });
  }

  getRecipes(){
    return this.recipes;
  }

  getTitle(){
    return this.title;
  }

}
