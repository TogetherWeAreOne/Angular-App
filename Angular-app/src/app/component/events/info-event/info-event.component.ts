import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../models/event.model";
import {ProductProposal} from "../../../models/productProposal.model";
import {ProductProposalService} from "../../../services/productProposal.service";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import {EventService} from "../../../services/event.service";
import {EventParticipant} from "../../../models/eventParticipant.model";

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {

  @Input() closeInfos = () => {};
  @Input() event! : Event;
  displayInfos : boolean = true;
  displayProposal : boolean = false;
  eventParticipant : EventParticipant[] = [];

  constructor(private eventParicipantService: EventParticipantService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadParticipant();
  }


  loadParticipant() {
    this.eventParicipantService.getParticipants(this.event.id!).subscribe(
      value => this.eventParticipant = value
    )
  }

  showInfos(){
    console.log(this.event);
    console.log("////////////////");
    //this.loadParticipant();
    console.log("adri");
    this.displayInfos = true;
    this.displayProposal = false;
  }

  showParticipant(){

    console.log(this.event)
    this.displayInfos = false;
    this.displayProposal = true;
    console.log(this.eventParticipant);
    console.log(this.event.id);
    console.log("//////");
    console.log(this.eventParticipant.length);
  }

  test(){
    console.log(this.eventParticipant)
  }


}
