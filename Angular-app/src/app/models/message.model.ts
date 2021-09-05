import {User} from "./user.model";
import {DiscussionUser} from "./discussionUser.model";

export class Message {
  id?: string
  content?: string;
  readed?: boolean;
  sendedDate? : Date;
  sender?: User;
  receiver?: User;
  discussion? : DiscussionUser;


  constructor(id: string, content: string, readed: boolean, sendedDate: Date, sender: User, receiver: User, discussion: DiscussionUser) {
    this.id = id;
    this.content = content;
    this.readed = readed;
    this.sendedDate = sendedDate;
    this.sender = sender;
    this.receiver = receiver;
    this.discussion = discussion;
  }
}
