import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events = [
    { title: 'Event 1', 
      start: '2025-03-10T12:30:00',
      description: 'redes socials',
      location: 'Barcelona'
    },
    { title: 'Event 2', 
      start: '2025-03-20T12:30:00',
      description: 'programacio',
      location: 'Barcelona'
    }
  ]


  constructor() { }

  getEvents() {
    return this.events;
  }
}
