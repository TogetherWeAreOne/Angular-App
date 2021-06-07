import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
   <section class="hero is-primary is-bold is-fullheight">
     <div class="hero-body">
       <div class="container">
         <h1 class="title has-text-centered" style="color:black;">
           Welcome to Together We Are One !
         </h1>
         <h2 class="subtitle has-text-centered" style="color:black;">
           Ensemble pour un future plus solidaire
         </h2>
       </div>
     </div>     
   </section>
  `,
  styles: [`
    .hero{
      background-image: url(~src/assets/img/image-eco.jpg) !important;
      background-size: cover;
      background-position: center center;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
