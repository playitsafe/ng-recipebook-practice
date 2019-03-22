import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  //@Output() recipeSelected = new EventEmitter<void>();

  //constructor(private recipeService: RecipeService) { }

  //pass the index of id from outside
  @Input() index: number;

  ngOnInit() {
  }

  /*
  onSelected() {
    //this.recipeSelected.emit();

    //to use service instead, to call method in service here
    this.recipeService.recipeSelected.emit(this.recipe);
  }
  */
}
