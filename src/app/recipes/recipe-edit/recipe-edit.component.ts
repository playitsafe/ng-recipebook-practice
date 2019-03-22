import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  //assume we are creating a new item by default
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //retrieve the id
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];

        //check if params has an id property
        this.editMode = params['id'] != null;
      }
    );
  }

}
