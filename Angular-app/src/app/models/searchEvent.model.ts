export class SearchEvent {
  title!: string;
  startDate!: Date;
  eventType!: string;
  zip!: string;


  constructor(title: string, startDate: Date, eventType: string, zip: string) {
    this.title = title;
    this.startDate = startDate;
    this.eventType = eventType;
    this.zip = zip;
  }
}
