
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../api-config';
import { Observable } from 'rxjs';
import { Ubicacion } from '../interfaces/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = `${API_BASE_URL}/ubicaciones`;

  ubicaciones = signal<Ubicacion[]>([]);  // ← Signal para almacenar ubicaciones

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(this.apiUrl);
  }

  loadUbicaciones() {
    this.http.get<Ubicacion[]>(this.apiUrl).subscribe((data) => {
      this.ubicaciones.set(data);
    });
  }

  getUbicacionNombreById(id: string): string | undefined {
    const ubicacion = this.ubicaciones().find(u => u._id === id);
    return ubicacion?.nombre;
  }
}