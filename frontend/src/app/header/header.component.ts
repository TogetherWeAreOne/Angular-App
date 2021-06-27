import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `

    <nav class="navbar is-dark">

      <!-- logo -->
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="assets/img/logo.png" alt="logo">
        </a>
      </div>

      <!-- menu -->
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" routerLink="">Home</a>
          <a class="navbar-item" routerLink="signin">Connexion</a>
          <a class="navbar-item" routerLink="users">Users</a>
        </div>
      </div>
      <div class=""></div>
    </nav>


    
  `,
  styles: [`
    .signin{
      margin-left: 2px !important;
      text-align: left !important;
      width: 150px !important;
    }
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
