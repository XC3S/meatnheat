import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component'
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

import { SearchService } from './services/search.service';
import { ProfileService } from './services/profile.service';
import { CookieService } from './services/cookie.service';
import { RecipeService } from './services/recipe.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeCarouselComponent } from './recipe-carousel/recipe-carousel.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ProfileComponent,
    CreateRecipeComponent,
    RecipeDetailComponent,
    RecipeCarouselComponent,
    LoadingComponent,
    LoginComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SearchService,
    ProfileService,
    CookieService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
