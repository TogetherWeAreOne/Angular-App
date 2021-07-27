import {Discussion} from "./discussion.model";
import {User} from "./user.model";

export class DiscussionMessage {
  id?: string;
  content? : string;
  user? : User;
  discussion? : Discussion;


  constructor(id: string, content: string, user: User, discussion: Discussion) {
    this.id = id;
    this.content = content;
    this.user = user;
    this.discussion = discussion;
  }
}
