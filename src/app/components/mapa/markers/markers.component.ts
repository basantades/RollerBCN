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
  private customIcons: { [key: string]: L.Icon } = {};

  constructor() {
    this.customIcons['basic'] = L.icon({
      iconUrl: 'assets/img/marker-icon-roller.png',
      // iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: 'assets/img/marker-shadow.png'
    });
    this.customIcons['Iniciación'] = L.icon({
      iconUrl: 'assets/img/marker-icon-ini.png',
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: 'assets/img/marker-shadow.png'
    });

    this.customIcons['Intermedio'] = L.icon({
      iconUrl: 'assets/img/marker-icon-int.png',
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: 'assets/img/marker-shadow.png'
    });

    this.customIcons['Avanzado'] = L.icon({
      iconUrl: 'assets/img/marker-icon-adv.png',
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
      shadowUrl: 'assets/img/marker-shadow.png'
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando el mapa esté disponible, añadir los marcadores
    if ((changes['map'] || changes['ubicaciones']) && this.map) {
        this.addMarkers();
    }
  }

  private addMarkers(): void {
    // Limpiar marcadores existentes 
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    if (this.ubicaciones) {
    this.ubicaciones.forEach((ubicacion) => {
      let icon: L.Icon;
        if (ubicacion.categoria.length === 1) {
          icon = this.customIcons[ubicacion.categoria[0]] || this.customIcons['basic'];
        } else {
          icon = this.customIcons['basic'];
        }
      const marker = L.marker([ubicacion.ubicacion.latitud, ubicacion.ubicacion.longitud], { icon }).addTo(this.map);

      const categoriasTexto = ubicacion.categoria.join(', ');
      marker.bindPopup(`<b>${ubicacion.nombre}</b> <br> Nivel: ${categoriasTexto}`);
    });
  }
  }
}