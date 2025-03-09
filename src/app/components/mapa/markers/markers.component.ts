import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Ubicacion } from '../../../interfaces/ubicacion';

@Component({
  selector: 'app-markers',
  imports: [],
  templateUrl: './markers.component.html',
  styleUrl: './markers.component.scss'
})

export class MarkersComponent implements OnChanges {
  @Input() map!: L.Map; 
  @Input() ubicaciones: Ubicacion[] = [];
  // private customIcon: L.Icon;

  constructor() {
    // Definir el ícono personalizado
    // this.customIcon = L.icon({
    //   iconUrl: 'assets/images/custom-marker.png',
    //   iconSize: [32, 32],
    //   iconAnchor: [16, 32],
    //   popupAnchor: [0, -32],
    //   shadowUrl: null
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando el mapa esté disponible, añadir los marcadores
    if ((changes['map'] || changes['ubicaciones']) && this.map) {
        this.addMarkers();
    }
  }

  // private addMarkers(): void {
  //   const marker = L.marker([41.3851, 2.1734]).addTo(this.map);
  //   marker.bindPopup('<b>¡Hola!</b><br>Este es un marcador');
  // }
  private addMarkers(): void {
    // Limpiar marcadores existentes 
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    if (this.ubicaciones) {
    this.ubicaciones.forEach((ubicacion) => {
      // const marker = L.marker([ubicacion.ubicacion.latitud, ubicacion.ubicacion.longitud], { icon: this.customIcon }).addTo(this.map);
      const marker = L.marker([ubicacion.ubicacion.latitud, ubicacion.ubicacion.longitud]).addTo(this.map);

      marker.bindPopup(`<b>${ubicacion.nombre}</b>`);
    });
  }
  }
}