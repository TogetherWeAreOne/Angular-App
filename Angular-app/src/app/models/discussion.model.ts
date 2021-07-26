import {Event} from "./event.model";

export class Discussion {
  id?: string;
  title? : string;
  lastMessageDate? : Date;
  event? : Event;

  constructor(title: string, lastMessageDate: Date, event: Event) {
    this.title = title;
    this.lastMessageDate = lastMessageDate;
    this.event = event;
  }
}
