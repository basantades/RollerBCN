import { Component, AfterViewInit, signal, effect } from '@angular/core';
import * as L from 'leaflet';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { Ubicacion } from '../../interfaces/ubicacion';
import { MarkersComponent } from "./markers/markers.component";
import { FilterComponent } from './filter/filter.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapa',
  imports: [MarkersComponent, FilterComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent implements AfterViewInit {

  // public map!: L.Map
  map = signal<L.Map | undefined>(undefined);
  ubicaciones$!: Observable<Ubicacion[]>; 
  ubicaciones = signal<Ubicacion[] | undefined>(undefined);
  filters = signal<{ [key: string]: boolean }>({
    'Iniciación': true,
    'Intermedio': true,
    'Avanzado': true
  });

  constructor(private ubicacionesService: UbicacionesService) {
    // Efecto para ajustar los límites del mapa cuando cambian las ubicaciones
    effect(() => {
      const ubicaciones = this.ubicaciones();
      const map = this.map();
      if (ubicaciones && map) {
        const bounds: L.LatLngBoundsExpression = ubicaciones.map(u => [u.ubicacion.latitud, u.ubicacion.longitud]);
        if (bounds.length > 0) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadUbicaciones();
  }

  private initMap(): void {
    const map = L.map('map', {
      center: [41.3951, 2.1734],
      zoom: 12
    });    

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd'
      }).addTo(map);
  
      this.map.set(map); // Actualiza el Signal con el mapa inicializado
    
    }
    

    private loadUbicaciones(): void {
      this.ubicaciones$ = this.ubicacionesService.getUbicaciones();
      this.ubicaciones$.subscribe({
        next: (ubicaciones: Ubicacion[]) => {
          console.log('Ubicaciones cargadas:', ubicaciones);
          this.ubicaciones.set(ubicaciones);
        },
        error: (error: any) => {
          console.error('Error al cargar las ubicaciones:', error);
        }
      });
    }
    onFiltersChange(filters: { [key: string]: boolean }): void {
      this.filters.set({ ...filters }); // Actualiza el Signal
    }
  }

  

