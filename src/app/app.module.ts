import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    //HeaderComponent,
    //HomeComponent
    //ShoppingListComponent,
    //ShoppingEditComponent,
    //DropdownDirective,
    //SignupComponent,
    //SigninComponent
  ],
  imports: [
    //BrowserModule includes common module, its special for app module
    //in other costum module, use CommonModule
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    HttpClientModule,
    //RecipesModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  providers: [
    // ShoppingListService, 
    // RecipeService, 
    // DataStorageService, 
    // AuthService, 
    // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
