

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../interfaces/event';
@Component({
  selector: 'app-edit-event-button',
  imports: [],
  templateUrl: './edit-event-button.component.html',
  styleUrl: './edit-event-button.component.scss'
})
export class EditEventButtonComponent {
  @Input() event: Event | null = null;
  @Output() editEvent = new EventEmitter<void>();

  onEdit() {
    this.editEvent.emit();  // Notifica al padre que quiere editar
  }
}
