import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    //only redirect if the full path is empty
    //---{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    //add a route point to the file#class name
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    // { path: 'recipes', component: RecipesComponent, children: [
    //     { path: '', component: RecipeStartComponent },
    //     { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    //     { path: ':id', component: RecipeDetailComponent },
    //     { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    // ] },
    { path: 'shopping-list', component: ShoppingListComponent }
    // { path: 'signup', component: SignupComponent },
    // { path: 'signin', component: SigninComponent }
];

//add @NgModule to transfer into angular module
//NgModule takes JS objs as 
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}