import {Component, Input, OnInit} from '@angular/core';
import { Event} from "../../../models/event.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  @Input() closeForm! : () => void;
  @Input() event! : Event;
  eventToUpdate! : Event ;

  updateEventForm! : FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    console.log("/////////////////////")
    console.log(this.event);

    this.eventService.getEventById(this.event.id!).subscribe( result => {(this.eventToUpdate = result)});

    this.updateEventForm = this.fb.group({
      title: [this.event.title, [Validators.required]],
      description: [this.event.description, [Validators.required]],
      startDate: [this.event.startDate, [Validators.required]],
      endDate: [this.event.endDate, [Validators.required]],
      eventType: [this.event.eventType, [Validators.required]],
      maxParticipant: [this.event.maxParticipant, ],
      minParticipant: [this.event.minParticipant, ],
      image: ["ffeff", [Validators.required]],
      address: [this.event.address, [Validators.required]],
      zip: [this.event.zip, [Validators.required]],
      country: [this.event.country, [Validators.required]],
    });

  }

  onSubmit(): void {
    let event = (this.updateEventForm.value as Event);
    this.eventService.updateEvent(this.eventToUpdate.id!, event).subscribe();

  }

  closeFormF(): void{
    this.closeForm();
  }


}
