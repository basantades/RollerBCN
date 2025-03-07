import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = `${API_BASE_URL}/ubicaciones`;

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}