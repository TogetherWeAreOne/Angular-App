import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {Event} from "../../models/event.model";
import {AddressApiService} from "../../services/addressApi.service";


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
    description: ["", [Validators.required]],
    startDate: ["", [Validators.required]],
    endDate: ["", [Validators.required]],
    eventType: ["", [Validators.required]],
    maxParticipant: ["", ],
    minParticipant: ["", ],
    image: ["ffeff", [Validators.required]],
    address: ["", [Validators.required]],
    zip: ["", [Validators.required]],
    city: ["", [Validators.required]],
    longitude : ["", []],
    latitude: ["", []]
  })
  adresseFromApi: any;
  myControl = new FormControl();
  options: any[] = [];
  addressSearchTimeOut!: number;

  constructor(private eventService: EventService, private fb: FormBuilder, private addressApiService: AddressApiService) {
  }

  ngOnInit(): void {
  }

  public setAddress(address : any) : void {
    this.eventForm.controls['address'].setValue(address?.properties?.name);
    this.eventForm.controls['zip'].setValue(address.properties.postcode);
    this.eventForm.controls['city'].setValue(address.properties.city);
    this.eventForm.controls['longitude'].setValue(address.geometry.coordinates[0]);
    this.eventForm.controls['latitude'].setValue(address.geometry.coordinates[1]);
  }

  public filter($event: any): void {
    clearTimeout(this.addressSearchTimeOut);
    this.addressSearchTimeOut = setTimeout(() => {
      if ($event.target.value === undefined || $event.target.value === '') {
        this.options = [];
        return;
      }
      this.addressApiService.getAddress($event.target.value).subscribe(
        address => this.options = address.features
      )}, 500);
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

  closeFormF(): void{
    this.closeForm();
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
