import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    //two ways to get the clicked recipe id
    //1.(only work when first time load the comp)
    //const id = this.route.snapshot.params['id'];
    //2. subscribe to the oberservable,really react according to new id
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //fetch the recipe by id
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onToListClicked() {
    //Directly access to shoppingListService

    // this.recipe.ingredients.forEach(
    //   (e) => { this.shoppinglistService.addIngredient(e); }
    // );

    //access via recipeService
    this.recipeService.addIngredientsToList(this.recipe.ingredients);

  }

  onEditRecipe() {
    //we dont need id in thsi case
     this.router.navigate(['edit'], {relativeTo:this.route});
    //on alternative way
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
