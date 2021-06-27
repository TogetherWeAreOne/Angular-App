import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card-body">
      <h5 class="card-title">{{name}}
        <div (click)="deleteEvent()" class="float-right">
          <i class="material-icons text-danger">
            delete
          </i>
        </div>
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">{{organisateur}}</h6>
      <p class="card-text  text-truncate" style="max-width: 500px;max-height: 500px;">{{description}}</p>
      <a class="card-link" href="{{link}}" routerLinkActive="router-link-active"><i class="material-icons">link</i></a>

      <div class="float-right" (click)="changeState()"><i class="material-icons "
                                                          [ngClass]="{'accepter': done==2,'refuser':done==3,'enCours':done==1,'pasReponse':done==0}">
        lens
      </i></div>
    </div>
  `,
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() organisateur: string;
  @Input() description: string;
  @Input() competence: string;
  @Input() tache: string;
  @Input() priority: number;
  @Input() email: string;
  @Input() link: string;
  @Input() tel: number;
  @Input() response: string;
  @Input() date_created: string;
  @Input() done: number;
  @Input() indice: number;

  constructor(private eventService:eventService) { }


  ngOnInit() {
  }
  deleteEvent() {
    this.eventService.dropTodo(this.id);
  }
  changeState() {
    this.eventService.changeState(this.done, this.id);
  }
