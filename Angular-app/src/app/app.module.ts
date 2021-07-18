import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthComponent} from './component/auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {RegisterComponent} from './component/register/register.component';
import {HomeComponent} from './component/home/home.component';
import {CommonModule} from "@angular/common";
import { MarketplaceComponent } from './component/marketplace/marketplace.component';

var GlobalHttpInterceptor;


const appRoutes: Routes = [
  {path: "auth", component: AuthComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    RegisterComponent,
    HomeComponent,
    MarketplaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
