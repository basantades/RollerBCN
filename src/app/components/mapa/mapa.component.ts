import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { UbicacionesService } from '../../services/ubicaciones.service';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent implements AfterViewInit {

  private map!: L.Map

  ngAfterViewInit(): void {
    this.initMap();
  }



  private initMap(): void {
    this.map = L.map('map').setView([41.3851, 2.1734], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    
    const marker = L.marker([41.3851, 2.1734]).addTo(this.map);
    // marker.bindPopup('<b>¡Hola!</b><br>Este es un marcador en Londres.').openPopup();
    marker.bindPopup('<b>¡Hola!</b><br>Este es un marcador en Londres.');

    
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
