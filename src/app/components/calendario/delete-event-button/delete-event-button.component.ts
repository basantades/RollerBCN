import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Event } from '../../../interfaces/event';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-event-button',
  imports: [],
  templateUrl: './delete-event-button.component.html',
  styleUrl: './delete-event-button.component.scss'
})
export class DeleteEventButtonComponent {
  private eventsService = inject(EventsService);
  private toastr = inject(ToastrService);


  @Input() event: Event | null = null;
  @Output() eventDeleted = new EventEmitter<void>(); 

  deleteEvent() {
    if (this.event?._id) {
      this.eventsService.deleteEvent(this.event._id).subscribe({
        next: () => {
          this.toastr.success('Evento eliminado correctamente');
          this.eventsService.loadEvents(); // Recarga eventos tras eliminar
          this.eventDeleted.emit();        // Notifica al padre para cerrar el modal
        },
        error: () => {
          this.toastr.error('Error al eliminar el evento');
        }
      });
    }
  }

  confirmDelete() {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this.deleteEvent();
    }
  }
}
