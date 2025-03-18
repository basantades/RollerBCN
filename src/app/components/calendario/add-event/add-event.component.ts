import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { Ubicacion } from '../../../interfaces/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';

@Component({
  selector: 'app-add-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  locations: Ubicacion[] = [];

  eventForm: FormGroup;
  categories = ['clase', 'ruta', 'reunion', 'evento'];
  levels = ['Iniciación', 'Intermedio', 'Avanzado'];

  constructor(
    private ubicacionesService: UbicacionesService,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      description: [''],
      location: [''],
      category: [[], Validators.required], // Multiselección
      level: [[]] // Opcional
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log('Enviando:', this.eventForm.value);
      // Aquí luego llamamos al servicio para crear el evento
    }
  }

  ngOnInit() {
    this.ubicacionesService.getUbicaciones().subscribe({
      next: (data) => {
        // Ordenar alfabéticamente por nombre
        this.locations = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      error: (err) => console.error('Error cargando ubicaciones', err),
    });
  }

}

