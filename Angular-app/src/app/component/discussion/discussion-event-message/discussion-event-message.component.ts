import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Discussion} from "../../../models/discussion.model";
import {Event} from "../../../models/event.model";
import {DiscussionService} from "../../../services/discussion.service";
import {DiscussionMessage} from "../../../models/discussionMessage.model";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {EventService} from "../../../services/event.service";
import {AuthService} from "../../../services/auth.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-discussion-event-message',
  templateUrl: './discussion-event-message.component.html',
  styleUrls: ['./discussion-event-message.component.css']
})
export class DiscussionEventMessageComponent implements OnInit {

  @Input() discussion! : Discussion;
  messages : DiscussionMessage[] = [];
  event? : Event;
  creator? : boolean = false;
  input? : string;
  @ViewChild('message-content') myInput!: ElementRef;


  constructor(private discussionService : DiscussionService, private eventService : EventService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.loadMessage();
    console.log(this.messages);
    this.getEvent();
  }

  loadMessage(): void {
    this.discussionService.getMessageByDiscussion(this.discussion.id!).subscribe(
      value => this.messages = value,
      () => {},
      () => this.messages.sort((x, y) => +new Date(x.date!) - +new Date(y.date!))
    )
    console.log(this.myInput.nativeElement.innerHTML);
  }

  getEvent() : void {
      this.discussionService.getEventByDiscussion(this.discussion.id!).subscribe(
        value => this.event = value,
        () => {},
        () => {this.creator = this.event?.creator?.id === this.authService.getConnectedUserId() }
      )
  }

  sendMessage() : void {
      const content = document.getElementById('message-content')!.innerHTML;
      console.log(content);
  }

  test() : void {
    console.log(this.discussion);
  }

}
