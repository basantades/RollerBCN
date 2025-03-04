import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  // private apiUrl = 'http://localhost:5100/events'; // URL del backend

  private apiUrl = 'https://api-rollerbcn.onrender.com/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Petición GET a la API
  }
}
