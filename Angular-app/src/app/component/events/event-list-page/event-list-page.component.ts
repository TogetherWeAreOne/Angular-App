import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event.model";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import { EventParticipant } from 'src/app/models/eventParticipant.model';
import {AuthService} from "../../../services/auth.service";
import {SearchProduct} from "../../../models/searchProduct.model";
import {SearchEvent} from "../../../models/searchEvent.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.css']
})
export class EventListPageComponent implements OnInit {

  displayInfos: boolean = false;
  eventFocus!: Event;
  events: Event[] = [];
  eventParticipation: EventParticipant[] = [];

  searchEventForm = this.fb.group({
    title: ["", []],
    startDate: ["", []],
    zip: ["", []],
    eventType: [[], []],
    negotiable: ["", []]
  })

  constructor(private eventService: EventService,
              private eventParticipantService: EventParticipantService,
              private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  searchEvent(){
    console.log(this.searchEventForm.value);
    this.eventService.searchEvent(this.searchEventForm.value as SearchEvent).subscribe(
      eventSearched => this.events = eventSearched
    );
  }

  loadEvent() {
    this.eventParticipantService.getUserEventParticipation().subscribe( value => this.eventParticipation = value);
    this.eventService.getAllEvent().subscribe(
      events => {
      this.events = events
    })
  }

  joinEvent(event : Event) {
    this.eventParticipantService.joinEvent(event).subscribe(value => this.eventParticipation.push(value));
  }

  leaveEvent(event: Event) {
    this.eventParticipantService.leaveEvent(event).subscribe(/*value =>
    {for (let i = 0; i < this.eventParticipation.length; i++){
        if(this.eventParticipation[i].event?.id === value.event?.id){
          this.eventParticipation.splice(i, 1);
          return;
        }
    }}*/
     );
    this.loadEvent();
  }

  amIParticipant(event : Event) : boolean {
    for( let i = 0; i < this.eventParticipation.length; i++){
      if ( this.eventParticipation[i].event?.id === event.id){
        return true;
      }
    }
    return false;
  }

  amICreator(event : Event) : boolean {
      if ( event.creator?.id === this.authService.getConnectedUserId()){
        return true;
      }

    return false;
  }


  getLeftPlace(a: number, b: number): number {
    return a-b;
  }

  getType(type: string){
    if (type === "ECOLOGICAL"){
      return 'Ecologique';
    }
    return 'Humanitaire';
  }

  showCreateForm = () : void =>{
    this.displayInfos = true;

  }

  closeCreateForm = () : void => {
    this.displayInfos = false;
    this.loadEvent();
  }
}
