import {Component, Injectable, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Discussion} from "../../../models/discussion.model";

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.css']
})
export class DiscussionListComponent implements OnInit {

  @Input() discussions! : Discussion[];
  @Output() focusDiscussion = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectDiscussion(discussion : Discussion) {
    this.focusDiscussion.emit(discussion);
  }

}
