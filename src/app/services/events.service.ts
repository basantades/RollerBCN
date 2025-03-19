import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse
import { catchError, tap, finalize } from 'rxjs/operators'; // Importa los operadores
import { Observable, throwError } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  private apiUrl = `${API_BASE_URL}/events`;

  events = signal<Event[]>([]);
  selectedEvent = signal<Event | null>(null);


  constructor(private http: HttpClient) { }

  loadEvents() {
    this.http.get<Event[]>(this.apiUrl).subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error al cargar eventos:', err)
    });
  }


  setSelectedEvent(event: Event) {
    this.selectedEvent.set(event);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSelectedEvent() {
    return this.selectedEvent();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    // Puedes personalizar el mensaje o diferenciar entre 400/500 aquí
    return throwError(() => new Error('Error al crear el evento. Intenta nuevamente.'));
  }
}
