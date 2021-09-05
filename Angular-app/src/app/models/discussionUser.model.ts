import {User} from "./user.model";
import {Discussion} from "./discussion.model";

export class DiscussionUser {
  id?: string;
  lastMessageDate?: Date;
  interlocutor?: User

  constructor(id: string, lastMessageDate: Date, interlocutor: User) {
    this.id = id;
    this.lastMessageDate = lastMessageDate;
    this.interlocutor = interlocutor;
  }
}
