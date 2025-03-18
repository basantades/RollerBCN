import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse
import { catchError, tap, finalize } from 'rxjs/operators'; // Importa los operadores
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  private apiUrl = `${API_BASE_URL}/events`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl); // Petición GET a la API
  }
}
