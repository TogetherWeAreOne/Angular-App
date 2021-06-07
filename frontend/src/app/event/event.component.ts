import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  template: `
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">  event   </h1>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container">
        <!-- event form -->
        
        <form >
          
        </form>
      </div>
    </section>
  `,
  styles: [
  ]
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
