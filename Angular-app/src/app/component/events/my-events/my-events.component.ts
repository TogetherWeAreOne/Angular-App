import { Component, OnInit } from '@angular/core';
import {Event} from "../../../models/event.model";
import {ProductService} from "../../../services/product.service";
import {EventService} from "../../../services/event.service";
import {aliasTransformFactory} from "@angular/compiler-cli/src/ngtsc/transform";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  displayCreateForm: boolean = false;
  displayInfos: boolean = false;
  displayUpdateForm: boolean = false;
  myEvents: Event[] = [];
  eventFocus!: Event ;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.loadMyEvent();
  }

  loadMyEvent() {
    this.eventService.getMyEvents().subscribe(events => {
      this.myEvents = events
    })
    console.log(this.myEvents);
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

}
