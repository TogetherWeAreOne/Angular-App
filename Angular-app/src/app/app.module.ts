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
import {CommonModule, registerLocaleData} from "@angular/common";
import {MarketplaceComponent} from './component/marketplace/marketplace.component';
import {MyProductComponent} from './component/product/my-product/my-product.component';
import { UpdateProductComponent } from './component/product/update-product/update-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoProductComponent } from './component/product/info-product/info-product.component';
import { EventListPageComponent } from './component/events/event-list-page/event-list-page.component';
import localeFr from '@angular/common/locales/fr';
import { DiscussionHomeComponent } from './component/discussion/discussion-home/discussion-home.component';
import { DiscussionListComponent } from './component/discussion/discussion-list/discussion-list.component';
import { DiscussionEventMessageComponent } from './component/discussion/discussion-event-message/discussion-event-message.component';
import { DiscussionEventMessageInfoComponent } from './component/discussion/discussion-event-message-info/discussion-event-message-info.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { EventPageComponent } from './component/events/event-page/event-page.component';
import { MyEventsComponent } from './component/events/my-events/my-events.component';
import { InfoEventComponent } from './component/events/info-event/info-event.component';
import { UpdateEventComponent } from './component/events/update-event/update-event.component';
import { AuctionListPageComponent } from './component/auction-sales/auction-list-page/auction-list-page.component';
import { AuctionPageComponent } from './component/auction-sales/auction-page/auction-page.component';
import { AuctionInfoComponent } from './component/auction-sales/auction-info/auction-info.component';
import { UpdateAuctionComponent } from './component/auction-sales/update-auction/update-auction.component';
import { MyAuctionComponent } from './component/auction-sales/my-auction/my-auction.component';
import { CreateAuctionComponent } from './component/auction-sales/create-auction/create-auction.component';


registerLocaleData(localeFr, 'fr');

const appRoutes: Routes = [

  {path: "", component: AuthComponent},
  {path: "auth", component: AuthComponent},
  {path: "test", component: CreateEventComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "createproduct", component: CreatProductComponent},
  {path: "myProduct", component: MyProductComponent},
  {path: "myEvent", component: MyEventsComponent},
  {path: "productMarketplace", component: MarketplaceComponent},
  {path: "events", component: EventListPageComponent},
  {path: "auctionSales", component: AuctionListPageComponent},
  {path: "myAuctionSales", component: MyAuctionComponent},
  {path: "message", component: DiscussionHomeComponent}

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
    UpdateProductComponent,
    InfoProductComponent,
    EventListPageComponent,
    DiscussionHomeComponent,
    DiscussionListComponent,
    DiscussionEventMessageComponent,
    DiscussionEventMessageInfoComponent,
    EventPageComponent,
    MyEventsComponent,
    InfoEventComponent,
    UpdateEventComponent,
    AuctionListPageComponent,
    AuctionPageComponent,
    AuctionInfoComponent,
    UpdateAuctionComponent,
    MyAuctionComponent,
    CreateAuctionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
