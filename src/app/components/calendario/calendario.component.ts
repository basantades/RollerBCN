import { Component, input } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { EventsService } from '../../services/events.service';
import { Interaction } from '@fullcalendar/core/internal.js';
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
    dateClick: (arg) => this.handleDateClick(arg),
    eventColor: '#FF0000',
    events: [] 
  };
  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr )
  }
  

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(
      (data) => {
        this.calendarOptions.events = data; // Asigna los eventos al calendario
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

}
