import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  //assume we are creating a new item by default
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }
  ngOnInit() {
    //retrieve the id
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //check if params has an id property
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    //console.log(this.recipeForm.value);
    const newRecipe = new Recipe(
      //get it via formControlName
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      //array of obj {ingredients format obj}
      this.recipeForm.value['ingredients']
    );

    if (this.editMode) {
      //if the form share the same key name w/ Recipe
      //can directly pass recipeForm.value here
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  //called when ever router changes
  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);
    //to check if its edit mode or not
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;

      //check whether the loaded recipe have ingredits
      if (recipe['ingredients']) {
        for (let ingrdt of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingrdt.name, Validators.required),
            'amount': new FormControl(ingrdt.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    } 
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
