import {User} from "./user.model";


export class Event {
  title: string;
  description?: string;
  maxParticipant?: number;
  minParticipant?: number;
  image?: string;
  address?: string;
  zip?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
  eventType?: string;
  creator?: User;


  constructor(title: string, description: string, maxParticipant: number, minParticipant: number, image: string, address: string, zip: string, country: string, startDate: string, endDate: string, eventType: string, creator: User) {
    this.title = title;
    this.description = description;
    this.maxParticipant = maxParticipant;
    this.minParticipant = minParticipant;
    this.image = image;
    this.address = address;
    this.zip = zip;
    this.country = country;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventType = eventType;
    this.creator = creator;
  }
}
