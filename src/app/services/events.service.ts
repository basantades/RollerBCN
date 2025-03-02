import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class EventsService {

//   events = [
//     { title: 'Event 1', 
//       start: '2025-03-10T12:30:00',
//       description: 'redes socials',
//       location: 'Barcelona'
//     },
//     { title: 'Event 2', 
//       start: '2025-03-20T12:30:00',
//       description: 'programacio',
//       location: 'Barcelona'
//     }
//   ]


//   constructor() { }

//   getEvents() {
//     return this.events;
//   }
// }
export class EventsService {
  private apiUrl = 'http://localhost:5100/events'; // URL del backend

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Petición GET a la API
  }
}
