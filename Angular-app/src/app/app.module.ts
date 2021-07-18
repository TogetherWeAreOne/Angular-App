import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { RouterModule, Routes} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { RegisterComponent } from './component/register/register.component';
import { GlobalHttpInterceptor} from "./interceptor/global-http-interceptor.service";
import { CreateEventComponent } from './component/create-event/create-event.component';
import { CreatProductComponent } from './component/create-product/create-product.component';
import { CreateAuctionSaleComponent } from './component/create-auction-sale/create-auction-sale.component';




const appRoutes: Routes = [
  { path : "auth", component: AuthComponent},
  { path : "test", component: CreateEventComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    RegisterComponent,
    CreateEventComponent,
    CreatProductComponent,
    CreateAuctionSaleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
