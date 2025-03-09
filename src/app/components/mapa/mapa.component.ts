import { Component, AfterViewInit, signal, effect } from '@angular/core';
import * as L from 'leaflet';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { Ubicacion } from '../../interfaces/ubicacion';
import { MarkersComponent } from "./markers/markers.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapa',
  imports: [MarkersComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent implements AfterViewInit {

  // public map!: L.Map
  map = signal<L.Map | undefined>(undefined);
  ubicaciones$!: Observable<Ubicacion[]>; 
  ubicaciones = signal<Ubicacion[] | undefined>(undefined);

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

  ngOnInit(): void {
    this.loadUbicaciones();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const map = L.map('map', {
      center: [41.3851, 2.1734],
      zoom: 14
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
          this.ubicaciones.set(ubicaciones); // Actualiza el Signal con las ubicaciones
        },
        error: (error: any) => {
          console.error('Error al cargar las ubicaciones:', error);
        }
      });
    }
  }

  // constructor(private ubicacionesService: UbicacionesService) {}

  // ngOnInit() {
  //   this.ubicacionesService.getUbicaciones().subscribe(
  //     (data) => {
  //       this.ubicaciones = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener ubicaciones:', error);
  //     }
  //   );
  // }

