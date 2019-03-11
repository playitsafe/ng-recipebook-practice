import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onToListClicked() {
    //Directly access to shoppingListService

    // this.recipe.ingredients.forEach(
    //   (e) => { this.shoppinglistService.addIngredient(e); }
    // );


    //access via recipeService
    this.recipeService.addIngredientsToList(this.recipe.ingredients);

  }
}
