import { Component, OnInit } from '@angular/core';
import {ProductProposalService} from "../../services/productProposal.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {DiscussionUserParticipant} from "../../models/discussionUserParticipant.model";
import {Discussion} from "../../models/discussion.model";
import {DiscussionUser} from "../../models/discussionUser.model";
import {Message} from "../../models/message.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  myDiscussionParticipation : DiscussionUserParticipant[] = [];
  myDiscussion: DiscussionUser[] = [];
  discussionTarget!: Discussion;
  discussionMessages: Message[] = [];
  displayMessage : boolean = false;
  displayDiscussionMessage : boolean = false;
  selectedUser!: User;
  addressSearchTimeOut!: number;
  userAutocomplete : User[] = [];
  messageForm = this.fb.group({
    content: ["", [Validators.required]]
  });



  constructor(private messageService : MessageService,
              public authService : AuthService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getMyDiscussionParticipation();
    console.log("//////////");
    console.log(this.myDiscussionParticipation);
    console.log("*************");
    //this.loadInterlocutor();
    console.log(this.myDiscussion);
  }

  public filter($event: any): void {
    clearTimeout(this.addressSearchTimeOut);
    this.addressSearchTimeOut = setTimeout(() => {
      if ($event.target.value === undefined || $event.target.value === '') {
        this.userAutocomplete = [];
        return;
      }
      this.authService.searchUsers($event.target.value).subscribe(
        users => this.userAutocomplete = users
      )}, 500);
  }

  async loadInterlocutor(discussion: DiscussionUser, i : number) : Promise<void> {
      this.messageService.getInterlocutorByDiscussion(discussion).toPromise().then(
        interlocutor => this.myDiscussion[i].interlocutor = interlocutor.user
      )
  }


  public launchDiscussion(user : User) : void {
    console.log("////////////////");
    console.log(user);
    document.getElementById('discussion')!.style.display = "none";
    document.getElementById('message-block')!.style.display = "block";
    this.displayDiscussionMessage = true;
    this.selectedUser = user;
  }

  getMyDiscussionParticipation() : void {
    this.messageService.getMyDiscussionsParticipation().toPromise().then(
      discussionParticipation => {this.myDiscussionParticipation = discussionParticipation;
        this.loadDiscussionInfos();}
    )
  }

  loadDiscussionInfos() : void {
    for (let i = 0; i < this.myDiscussionParticipation.length; i++) {
      setTimeout(() => {
        this.messageService.getDiscussionByParticipation(this.myDiscussionParticipation[i]).toPromise().then(
          async infos => {
            this.myDiscussion.push(infos);
            this.myDiscussion[i].interlocutor = undefined;
            await this.loadInterlocutor(this.myDiscussion[i], i)
          },
        )
      }, 600);
    };
    console.log("je rentre");
    this.discussionMessages = this.sortDiscussionByDate(this.myDiscussion, this.myDiscussion.length)
  }

  sortDiscussionByDate(discussion : DiscussionUser[], n : number) : DiscussionUser[]{
    for (let i = 0 ; i < n ; i ++)
    {
      for (let j = 0 ; j < n-1 ; j ++)
      {
        if (discussion[j].lastMessageDate!.getTime() < discussion[j+1].lastMessageDate!.getTime())
        {
          var temp = discussion[j];
          discussion[j]=discussion[i];
          discussion[i]=temp;
        }
      }
    }
    console.log("discussion");
    console.log(discussion);
    return discussion;
  }


  getDiscussionInfos(participation : DiscussionUserParticipant): void {
    this.messageService.getDiscussionByParticipation(participation).subscribe(
      discussion => this.myDiscussionParticipation
    )
  }

  getDiscussionMessages(discussion : DiscussionUser): void {
    this.messageService.getMessageByDiscussion(discussion).subscribe(
      messages => this.discussionMessages = messages,
      (err ) => {
        console.log(err)},
      () => {
        console.log("je rentre");
        this.discussionMessages = this.sortDiscussionByDate(this.discussionMessages, this.discussionMessages.length)}
    )
  }

  onSubmit(): void{
    this.messageService.sendMessage(this.selectedUser, this.messageForm.value.content).subscribe(
      message => {this.discussionMessages.push(message)}
    );
    this.messageForm.reset();
  }


  showMessage(discussion : DiscussionUser) : void {
    document.getElementById('discussion')!.style.display = "none";
    document.getElementById('message-block')!.style.display = "block";
    this.displayDiscussionMessage = true
    this.getDiscussionMessages(discussion);
    this.selectedUser = discussion.interlocutor!;
  }

  backToDiscussionList() : void {
    document.getElementById('discussion')!.style.display = "block";
    document.getElementById('message-block')!.style.display = "none";
    this.displayDiscussionMessage = false;
    this.discussionMessages = [];
    this.myDiscussion = [];
    this.getMyDiscussionParticipation();
  }

  openMessage() : void {
    document.getElementById('content')!.style.display = "block";
    this.displayMessage = true
  }

  closeMessage() : void {
    document.getElementById('content')!.style.display = "none";
    this.displayMessage = false;
  }

  test(): void {
    console.log(this.discussionMessages)
  }

}
