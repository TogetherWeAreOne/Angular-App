import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event-form',
  template: `
    <form (ngSubmit)="onSubmit(f)" #f="ngForm">
      <div class="row justify-content-center">
        <div class="card col-md-4 mt-2 mr-2" *ngFor="let unChiffre of  tabCompteurInput;let i= index">
          <div class="card-body">
            <div class="row">
              <div class="col-md-5">
                <h5 class="card-title"> <input type="text" class="form-control  " name="{{unChiffre}}name"
                                               placeholder="Post à Pourvoir" ngModel></h5>
              </div>
              <div class="col-md-7"><input type="text" class="form-control " name="{{unChiffre}}link" placeholder="Liens"
                                           ngModel></div>
            </div>
            <h6 class="card-subtitle mb-2 text-muted"> <input type="text" class="form-control col-md-6"
                                                              name="{{unChiffre}}societe" placeholder="Société" ngModel> </h6>
            <p class="card-text"><textarea class="form-control " name="{{unChiffre}}description" placeholder="Déscription"
                                           ngModel></textarea></p>
            <p class="card-text"><textarea class="form-control " name="{{unChiffre}}competence" placeholder="Competence"
                                           ngModel></textarea></p>
            <p class="card-text"><textarea class="form-control " name="{{unChiffre}}tache" placeholder="Tache"
                                           ngModel></textarea></p>
            <div class="row ">
              <div class="col-md-5"><input type="text" class="form-control  " name="{{unChiffre}}tel"
                                           placeholder="Téléphone" ngModel></div>
              <div class="col-md-7"><input type="text" class="form-control " name="{{unChiffre}}email" placeholder="Email"
                                           ngModel></div>
            </div>
            <div class="row mt-2">
              <div class="col-12"><input type="number" class="form-control" name="{{unChiffre}}priority"
                                         placeholder="priority" ngModel>
              </div>
            </div>
            <button class="btn btn-danger card-link btn-block mt-3" style="height: 38px;" type="button"
                    (click)="suppligne(i)">Delete
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3 mb-3">
        <button class="btn btn-danger mr-2" type="submit" *ngIf="tabCompteurInput.length !==0">
          Sauvegarder
        </button>
        <button type="button" class="btn btn-secondary mr-2"   routerLink="/dashboard" routerLinkActive=”active” >
          Retour
        </button>
        <button class="btn btn-success" type="button" (click)="add()">
          Ajouter
        </button>
      </div>
      <div>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class AddEventFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}