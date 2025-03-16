import { Component, effect, Input, OnChanges, Signal, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Ubicacion } from '../../../interfaces/ubicacion';

@Component({
  selector: 'app-markers',
  imports: [],
  templateUrl: './markers.component.html',
  styleUrl: './markers.component.scss'
})

export class MarkersComponent {
  @Input() map!: L.Map; 
  @Input() ubicaciones!: Signal<Ubicacion[] | undefined>;
  @Input() filters!: Signal<{ [key: string]: boolean }>;
  
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

    effect(() => {
      console.log('Effect disparado - Map:', this.map, 'Ubicaciones:', this.ubicaciones(), 'Filters:', this.filters());
      if (this.map && this.ubicaciones() && this.ubicaciones()!.length > 0 && this.filters()) {
        this.addMarkers();
      }
    });

  }

  private addMarkers(): void {
    // Limpiar marcadores existentes 
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    this.ubicaciones()!.forEach((ubicacion) => {
      const shouldShow = ubicacion.categoria.some((cat) => this.filters()[cat]);
      console.log('Ubicación:', ubicacion.nombre, 'Categorías:', ubicacion.categoria, 'Mostrar:', shouldShow);
      if (!shouldShow) return;

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