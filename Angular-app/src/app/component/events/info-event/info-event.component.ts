import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../models/event.model";
import {ProductProposal} from "../../../models/productProposal.model";
import {ProductProposalService} from "../../../services/productProposal.service";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import {EventService} from "../../../services/event.service";
import {EventParticipant} from "../../../models/eventParticipant.model";
import { Loader } from '@googlemaps/js-api-loader';

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
    let loader = new Loader({
      apiKey: 'AIzaSyB-B4PlR1Wt6s-LUqY8S8x81pobAKuznmE'
    })

    let mapOptions = {
      zoom : 15,
      center: {
        lat: this.event.latitude!,
        lng: this.event.longitude!
      }
    }

    loader.load().then( () => {
       var map = new google.maps.Map(document.getElementById('map')!, mapOptions);
       var marker = new google.maps.Marker({
         position : {
           lat: this.event.latitude!,
           lng: this.event.longitude!
         },
         map : map
         }
       )
    })
  }

  loadParticipant() {
    this.eventParicipantService.getParticipants(this.event.id!).subscribe(
      value => this.eventParticipant = value
    )
  }

  showInfos(){
    this.displayInfos = true;
    this.displayProposal = false;
  }

  showParticipant(){
    this.displayInfos = false;
    this.displayProposal = true;
  }

  test(){
    console.log(this.eventParticipant)
  }


}
