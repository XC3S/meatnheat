import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Input('recipes')
  recipes = [];

  @Input('userid')
  userid = "";

  constructor() { }

  ngOnInit() {
  }

}
