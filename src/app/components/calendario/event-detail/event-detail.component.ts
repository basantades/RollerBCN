import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../services/events.service';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { Ubicacion } from '../../../interfaces/ubicacion';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {
  private eventsService = inject(EventsService);
  private ubicacionesService = inject(UbicacionesService);

  event = this.eventsService.selectedEvent;
  ubicaciones = signal<Ubicacion[]>([]);

  constructor() {
    this.ubicacionesService.loadUbicaciones();
  }

  getUbicacionNombreById(id: string | undefined): string {
    if (!id) return 'Ubicación desconocida';
    return this.ubicacionesService.getUbicacionNombreById(id) ?? 'Ubicación desconocida';
  }
}
