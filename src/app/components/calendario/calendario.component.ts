import { Component, effect, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Event as AppEvent } from '../../interfaces/event';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsService } from '../../services/events.service';
import { ModalComponent } from './modal/modal.component';



@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule, AddEventComponent, ModalComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {

  private eventsService = inject(EventsService);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    events: [],
    timeZone: 'Europe/Madrid', 
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
  
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  onEventoCreado() {
    this.closeModal();
    this.eventsService.loadEvents();
  }

  constructor() {
    // 👇 Aquí SÍ está en contexto de inyección
    this.eventsService.loadEvents();

    effect(() => {
      const events = this.eventsService.events();
      this.calendarOptions.events = events.map(event => ({
        id: event._id,
        title: event.title,
        start: event.start,
        extendedProps: { category: event.category }
      }));
    });
  }


  
}