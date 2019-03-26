import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {

    this.subscription = this.shoppinglistService.startEditing.subscribe(
      (index: number) => {
        //to receive the clicked index
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });

      });
  }

  onAddItem(form: NgForm) {

    //ngForm value is an obj of key-value pair of formControls
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    //to set it back and clear form
    this.editMode = false;
    form.reset();
  }

  onDelete() {

    if (this.editMode) {
      this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    } 

    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
