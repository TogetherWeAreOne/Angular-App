import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthComponent} from './component/auth/auth.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {NavBarComponent} from './component/nav-bar/nav-bar.component';
import {RegisterComponent} from './component/register/register.component';
import {GlobalHttpInterceptor} from "./interceptor/global-http-interceptor.service";
import {CreateEventComponent} from './component/create-event/create-event.component';
import {CreatProductComponent} from './component/product/create-product/create-product.component';
import {CreateAuctionSaleComponent} from './component/create-auction-sale/create-auction-sale.component';
import {HomeComponent} from './component/home/home.component';
import {CommonModule} from "@angular/common";
import {MarketplaceComponent} from './component/marketplace/marketplace.component';
import {MyProductComponent} from './component/product/my-product/my-product.component';
import { UpdateProductComponent } from './component/product/update-product/update-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const appRoutes: Routes = [

  {path: "", component: AuthComponent},
  {path: "test", component: CreateEventComponent},
  {path: "home", component: HomeComponent},
  {path: "createproduct", component: CreatProductComponent},
  {path: "myProduct", component: MyProductComponent},
  {path: "productMarketplace", component: MarketplaceComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    RegisterComponent,
    CreateEventComponent,
    CreatProductComponent,
    CreateAuctionSaleComponent,
    HomeComponent,
    MarketplaceComponent,
    MyProductComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
