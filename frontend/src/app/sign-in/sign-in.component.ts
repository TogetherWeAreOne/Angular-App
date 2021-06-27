import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sign-in',
  template: `
    
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title"> sign-in </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- sign-in form -->
        <form>

          <!-- name -->
          <div class="field">
            <label class="label"> Nom </label>
            <input type="text" name="name" class="input" [(ngModel)]="name">
          </div>
          <!-- lastname -->
          <div class="field">
            <label class="label"> Prénom </label>
            <input type="text" name="lastname" class="input">
          </div>
          <!-- email -->
          <div class="field">
            <label class="label"> Adresse e-mail </label>
            <input type="text" name="email" class="input">
          </div>
          <!-- password -->
          <div class="field">
            <label class="label"> Mot de passe </label>
            <input type="text" name="password" class="input">
          </div>
          <!-- password comfirmation -->
          <div class="field">
            <label class="label"> Confirmation </label>
            <input type="text" name="password comfirmation" class="input">
          </div>
          <!-- pseudo -->
          <div class="field">
            <label class="label"> Pseudonyme </label>
            <input type="text" name="pseudo" class="input">
          </div>
          <!-- avatar -->
          <!-- type role -->
          <div class="field">

          </div>
          <!-- birthdate -->
          <div class="field">
            <label class="label"> Date de naissance </label>
            <input type="text" name="birthdate" class="input">
          </div>
          <!-- address number -->
          <div class="field">
            <label class="label"> Numéro d'adresse </label>
            <input type="text" name="address number" class="input">
          </div>
          <!-- address -->
          <div class="field">
            <label class="label"> Adresse </label>
            <input type="text" name="address" class="input">
          </div>
          <!-- postal code -->
          <div class="field">
            <label class="label"> Code Postal </label>
            <input type="text" name="postal code" class="input">
          </div>
          <!-- country -->
          <div class="field">
            <label class="label"> Pays </label>
            <input type="text" name="country" class="input">
          </div>
          <!-- telephone number -->
          <div class="field">
            <label class="label"> Numéro de téléphone </label>
            <input type="text" name="telephone number" class="input">
          </div>
          <!-- submit button -->
          <button type="submit" class="button is-large is-warning">
            Valider
          </button>

        </form>
      </div>
    </section>
    
  `,
  styles: [
  ]
})
export class SignInComponent implements OnInit {
  name: any;
   

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void{
    // grab field and their values



  }

}
