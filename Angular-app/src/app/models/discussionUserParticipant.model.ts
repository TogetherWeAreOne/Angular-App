import {User} from "./user.model";
import {Discussion} from "./discussion.model";
import {DiscussionUser} from "./discussionUser.model";

export class DiscussionUserParticipant {
  user: User;
  discussion: DiscussionUser;

  constructor(user: User, discussion: DiscussionUser) {
    this.user = user;
    this.discussion = discussion;
  }
}
