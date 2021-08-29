import {User} from "./user.model";


export class Event {
  id?: string;
  title: string;
  description?: string;
  maxParticipant?: number;
  minParticipant?: number;
  image?: string;
  address?: string;
  zip?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  eventType?: string;
  creator?: User;
  longitude?: number;
  latitude?: number;


  constructor(id: string, title: string, description: string, maxParticipant: number, minParticipant: number, image: string, address: string, zip: string, city: string, startDate: string, endDate: string, eventType: string, creator: User, longitude: number, latitude: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.maxParticipant = maxParticipant;
    this.minParticipant = minParticipant;
    this.image = image;
    this.address = address;
    this.zip = zip;
    this.city = city;
    this.startDate = startDate;
    this.endDate = endDate;
    this.eventType = eventType;
    this.creator = creator;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
