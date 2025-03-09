import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Ubicacion } from '../interfaces/ubicacion';
@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = `${API_BASE_URL}/ubicaciones`;

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(this.apiUrl);
  }

}