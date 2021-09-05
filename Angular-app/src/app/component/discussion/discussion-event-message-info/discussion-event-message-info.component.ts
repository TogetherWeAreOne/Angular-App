import {Component, Input, OnInit} from '@angular/core';
import {Discussion} from "../../../models/discussion.model";
import {Event} from "../../../models/event.model";
import {EventService} from "../../../services/event.service";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import {EventParticipant} from "../../../models/eventParticipant.model";

@Component({
  selector: 'app-discussion-event-message-info',
  templateUrl: './discussion-event-message-info.component.html',
  styleUrls: ['./discussion-event-message-info.component.css']
})
export class DiscussionEventMessageInfoComponent implements OnInit {

  @Input() discussion! : Discussion;
  eventToDisplay? : Event;
  participants? : EventParticipant[];
  participant? : number;

  constructor(private eventService: EventService, private eventParticipant : EventParticipantService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.discussion !== undefined) {
      this.eventToDisplay = this.discussion.event;
      this.getParticipant();
    }
  }

  loadEvent() : void {
    this.eventService.getEventById(this.eventToDisplay!.id!).subscribe(
      value => this.eventToDisplay = value
    )
  }

  getParticipant() : void {
    this.eventParticipant.getParticipants(this.eventToDisplay?.id!).subscribe(
      value => this.participants = value,
      () => {},
      () => {this.participant = this.participants?.length;
    console.log(this.participant)}
    )
  }

  test(): void{
    console.log(this.discussion);
  }

}
