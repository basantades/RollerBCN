import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { UbicacionesService } from '../../services/ubicaciones.service';
import { MarkersComponent } from "./markers/markers.component";

@Component({
  selector: 'app-mapa',
  imports: [MarkersComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent implements AfterViewInit {

  public map!: L.Map

  ngAfterViewInit(): void {
    this.initMap();
  }



  private initMap(): void {
    this.map = L.map('map').setView([41.3851, 2.1734], 14);
    
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd'
      }).addTo(this.map);

    
    // const marker = L.marker([41.3851, 2.1734]).addTo(this.map);
    // marker.bindPopup('<b>¡Hola!</b><br>Este es un marcador');

    }
    
  


  ubicaciones: any[] = [];

  constructor(private ubicacionesService: UbicacionesService) {}

  ngOnInit() {
    this.ubicacionesService.getUbicaciones().subscribe(
      (data) => {
        this.ubicaciones = data;
      },
      (error) => {
        console.error('Error al obtener ubicaciones:', error);
      }
    );
  }
}
