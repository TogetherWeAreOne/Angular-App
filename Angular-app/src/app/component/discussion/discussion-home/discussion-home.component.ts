import { Component, OnInit } from '@angular/core';
import {Discussion} from "../../../models/discussion.model";
import {Event} from "../../../models/event.model";
import {AuthService} from "../../../services/auth.service";
import {DiscussionService} from "../../../services/discussion.service";
import {EventService} from "../../../services/event.service";
import {EventParticipantService} from "../../../services/eventParticipant.service";
import {EventParticipant} from "../../../models/eventParticipant.model";

@Component({
  selector: 'app-discussion-home',
  templateUrl: './discussion-home.component.html',
  styleUrls: ['./discussion-home.component.css']
})
export class DiscussionHomeComponent implements OnInit {

  discussions : Discussion[] = [];
  eventsParticipation : EventParticipant[] = [];
  discussionFocused! : Discussion ;

  constructor(private authService : AuthService, private discussionService : DiscussionService, private eventParticipantService : EventParticipantService) { }

  ngOnInit(): void {
    this.loadParticipation();
    console.log( this.eventsParticipation);
  }

  loadParticipation( ): void {
    const userId = this.authService.getConnectedUserId();
    console.log(userId)
      this.eventParticipantService.getMyParticipation().subscribe(
        value => this.eventsParticipation = value,
        value => {},
        () => this.loadDiscussion()
      );
  }

  loadDiscussion() : void {
      for ( let i = 0; i < this.eventsParticipation.length; i ++){

        this.discussionService.getDiscussionById(this.eventsParticipation[i].event!.id!).subscribe(
          value => this.discussions.push(value),
          () => {},
          () => {this.discussions.sort((x, y) => +new Date(x.lastMessageDate!) - +new Date(y.lastMessageDate!));
          this.discussions.reverse()}
          )
      }
  }

  test(): void{
    console.log(this.discussionFocused);
  }
}
