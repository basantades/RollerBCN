import { Component } from '@angular/core';
import { UbicacionesService } from '../../services/ubicaciones.service';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})

export class MapaComponent {
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
