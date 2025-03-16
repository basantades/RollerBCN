import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Chart } from '../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private apiUrl = `${API_BASE_URL}/charts`;

  constructor(private http: HttpClient) {}

  getChartByName(name: string): Observable<Chart> {
    return this.http.get<Chart>(`${this.apiUrl}/${name}`);
  }
  getAllCharts(): Observable<Chart[]> {
    return this.http.get<Chart[]>(this.apiUrl);
  }

}
