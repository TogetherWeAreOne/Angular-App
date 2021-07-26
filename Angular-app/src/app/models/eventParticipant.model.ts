import {User} from "./user.model";
import {Event} from "./event.model";

export class EventParticipant {
  user?: User;
  event?: Event;
  role?: string;

  constructor(user: User, event: Event, role: string) {
    this.user = user;
    this.event = event;
    this.role = role;
  }
}
