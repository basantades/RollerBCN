import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { EventsService } from '../../services/events.service';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    events: [],
    contentHeight: 'auto',
    eventContent: (arg) => {
      const eventTime = arg.event.start
        ? new Date(arg.event.start).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        : '';

        let eventClass = 'default-event'; 

        if (arg.event.extendedProps['category']?.includes('Ruta')) {
          eventClass = 'ruta-event';
        } else if (arg.event.extendedProps['category']?.includes('Clase')) {
          eventClass = 'clase-event';
        }
  
        return {
          html: `
        <div class="custom-event ${eventClass}">
              <div class="event-title">${arg.event.title}</div>
              <div class="event-time">${eventTime}</div>
            </div>
          `
        };
    }
  };
  
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe({
      next: (data) => (this.calendarOptions.events = data),
      error: (error) => console.error('Error al obtener eventos:', error)
    });
  }

}