import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event.model";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  @Input() closeForm! : () => void;
  events: Event[] = [];
  eventForm = this.fb.group({
    title: ["", [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ["", [Validators.required]],
    endDate: ["", [Validators.required]],
    eventType: ["", [Validators.required]],
    maxParticipant: ["", [Validators.required]],
    minParticipant: ["", [Validators.required]],
    image: ["", [Validators.required]],
    address: ["", [Validators.required]],
    zip: ["", [Validators.required]],
    country: ["", [Validators.required]],
  })

  constructor(private eventService: EventService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.eventForm.value);
    const eventFormValue = this.eventForm.value;
    this.eventService.createEvent(
      this.eventForm.value
    ).subscribe()
    this.eventForm.reset();
  }

  loadEvent() {
    this.eventService.getAllEvent().subscribe(events => {
      this.events = events
    })
    console.log(this.events);
  }



}/*
eventFormValue.title,
  eventFormValue.description,
  eventFormValue.maxParticipant,
  eventFormValue.minParticipant,
  eventFormValue.image,
  eventFormValue.address,
  eventFormValue.zip,
  eventFormValue.country,
  eventFormValue.startDate,
  eventFormValue.endDate,
  eventFormValue.eventType*/
