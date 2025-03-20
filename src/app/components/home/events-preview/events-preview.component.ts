import { Component, computed, inject } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { Event } from '../../../interfaces/event';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-events-preview',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './events-preview.component.html',
  styleUrl: './events-preview.component.scss'
})
export class EventsPreviewComponent {

    private ubicacionesService = inject(UbicacionesService);

    constructor(public eventsService: EventsService) {
      this.ubicacionesService.loadUbicaciones();
    }

  readonly upcomingEvents = computed(() => {
    const now = new Date();
    return this.eventsService.events()
      .filter(event => new Date(event.start) > now)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 3);
  });

  getUbicacionNombreById(id: string | undefined): string {
    if (!id) return 'Ubicación desconocida';
    return this.ubicacionesService.getUbicacionNombreById(id) ?? 'Ubicación desconocida';
  }

  getCategoryClass(event: Event): string {
    if (event.category?.includes('ruta')) return 'ruta-event';
    if (event.category?.includes('clase')) return 'clase-event';
    if (event.category?.includes('evento')) return 'evento-event';
    return 'default-event';
  }


}
