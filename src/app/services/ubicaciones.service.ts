import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = 'https://api-rollerbcn.onrender.com/ubicaciones';

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}