import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  private apiUrl = `${API_BASE_URL}/eventes`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Petición GET a la API
  }
}
