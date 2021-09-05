import { Component, OnInit } from '@angular/core';
import {Event} from "../../../models/event.model";
import {EventService} from "../../../services/event.service";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import {EventParticipant} from "../../../models/eventParticipant.model";
import {FormBuilder} from "@angular/forms";
import * as moment from 'moment';


@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayInfos: boolean = false;
  displayUpdateForm: boolean = false;
  myEvents: EventParticipant[] = [];
  myEventsCopy: EventParticipant[] = [];
  eventFocus!: Event ;

  searchEventForm = this.fb.group({
    title: ["", []],
    startDate: ["", []],
    zip: ["", []],
    eventType: ["", []],
  })

  constructor(private eventService: EventService,
              private eventParticipantService: EventParticipantService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadMyEvent();
  }

  searchEvent(){
    this.myEvents = this.myEventsCopy;
    this.searchEventForm.value.title = this.searchEventForm.value.title === "" ? '.*' : (this.searchEventForm.value.title === '.*' ? '.*' : this.searchEventForm.value.title + '*');
    this.searchEventForm.value.eventType = this.searchEventForm.value.eventType === "" ? '.*' : (this.searchEventForm.value.eventType === '.*' ? '.*' : this.searchEventForm.value.eventType + '*');
    this.searchEventForm.value.zip = this.searchEventForm.value.zip === "" ? '.*' : (this.searchEventForm.value.zip === '.*' ? '.*' : this.searchEventForm.value.zip + '[0-9]{3}');
    this.searchEventForm.value.startDate = this.searchEventForm.value.startDate === "" ? new Date(moment().clone().format('YYYY-MM-DD')) : this.searchEventForm.value.startDate;
    console.log(this.searchEventForm.value);
    this.myEvents = this.myEvents.reduce( (eventFiltered: EventParticipant[] , eventParticipation) =>{
      if ( eventParticipation.event?.title.match(this.searchEventForm.value.title)){
        if ( eventParticipation.event?.zip!.match(this.searchEventForm.value.zip)){
          if ( eventParticipation.event?.eventType!.match(this.searchEventForm.value.eventType)){
            if ( new Date(eventParticipation.event?.startDate!).getTime() >= new Date(this.searchEventForm.value.startDate).getTime()){
              eventFiltered.push(eventParticipation);
            }
          }
        }
      }
      return eventFiltered;
    }, []);
    console.log(this.myEvents);
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
    this.loadMyEvent();
  }

  loadMyEvent() {
    this.eventParticipantService.getMyParticipation().subscribe(eventParticipation => {
      this.myEvents = eventParticipation
    }, ()=>{}, () => {
      console.log("je suis rentré");
      for (let i = 0; i < this.myEvents.length; i++) {
        if (this.myEvents[i].event === null) {
          this.myEvents.splice(i, 1);
          i--;
        }
      }
      this.myEventsCopy = this.myEvents;
      console.log(this.myEventsCopy);
    })
  }

  update() {
    this.loadMyEvent();
  }

  showCreateForm = () : void =>{
    this.displayCreateForm = true;
    console.log(this.displayCreateForm);
  }

  closeCreateForm = () : void => {
    this.displayCreateForm = false;
  }

  showUpdateForm(event: Event){
    this.displayUpdateForm = true;
    this.eventFocus = event;
  }

  closeUpdateForm = () : void => {
    this.displayUpdateForm = false;
  }

  showInfos(event: Event){
    this.displayInfos = true;
    this.eventFocus = event;
  }

  closeInfos = () : void => {
    this.displayInfos = false;
  }

  deleteEvent(event: Event){
    if (confirm(" Voulez-vous vraiment supprimer cet évenement ? ")){
    this.eventService.deleteEvent(event.id!).subscribe(() => {}, () => {},
      () => {
      for(let i = 0; i < this.myEvents.length; i++ ){
        if (this.myEvents[i].event === event){
          this.myEvents.splice(i,1);
        }
      }
    })}
  }

}
