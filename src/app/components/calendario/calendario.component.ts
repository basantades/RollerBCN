import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { EventsService } from '../../services/events.service';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Event } from '../../interfaces/event';
import { AddEventComponent } from './add-event/add-event.component';



@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule, AddEventComponent],
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
      next: (data: Event[]) => {  // Tipado aquí
        // Mapea los datos de la API al formato esperado por FullCalendar
        this.calendarOptions.events = data.map(event => ({
          id: event._id, // Importante para identificar el evento
          title: event.title,
          start: event.start,
          end: event.start, // Puedes ajustar esto si tienes una fecha de finalización diferente
          description: event.description,
          location: event.location,
          category: event.category,
          level: event.level,
          extendedProps: {
            category: event.category
          }

        }));
      },
      error: (error) => console.error('Error al obtener eventos:', error)
    });
  }

}