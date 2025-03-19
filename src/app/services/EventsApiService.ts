import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_BASE_URL } from '../api-config';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService { // O EventsDataService

  private apiUrl = `${API_BASE_URL}/events`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event)
      .pipe(catchError(this.handleError));
  }

  updateEvent(event: Event): Observable<Event> {
    if (!event._id) {
      return throwError(() => new Error('Event ID is required for update.'));
    }
    return this.http.put<Event>(`${this.apiUrl}/${event._id}`, event)
      .pipe(catchError(this.handleError));
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}