import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ubicacion } from '../../../interfaces/ubicacion';
import { EventsApiService } from '../../../services/EventsApiService';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent implements OnInit {
  @Input() event!: any; // Ajusta el tipo si tienes una interfaz
  @Output() eventoActualizado = new EventEmitter<void>();

  eventForm: FormGroup;
  categories = ['clase', 'ruta', 'evento', 'reunion'];
  levels = ['Iniciación', 'Intermedio', 'Avanzado'];
  locations: Ubicacion[] = [];

  isLoading = false;
  apiError = '';

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsApiService,
    private ubicacionesService: UbicacionesService,
    private toastr: ToastrService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      category: [[], Validators.required],
      level: [[]]
    });
  }

  ngOnInit() {
    this.ubicacionesService.getUbicaciones().subscribe((data) => {
      this.locations = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });

    // Pre-carga de datos al formulario
    this.eventForm.patchValue({
      title: this.event.title,
      start: this.event.start.slice(0, 16),
      description: this.event.description,
      location: this.event.location,
      category: this.event.category,
      level: this.event.level
    });
  }

  public toggleCategory(value: string) {
    const control = this.eventForm.get('category');
    const current = control?.value || [];
    if (current.includes(value)) {
      control?.setValue(current.filter((cat: string) => cat !== value));
    } else {
      control?.setValue([...current, value]);
    }
  }

  public toggleLevel(value: string) {
    const control = this.eventForm.get('level');
    const current = control?.value || [];
    if (current.includes(value)) {
      control?.setValue(current.filter((lvl: string) => lvl !== value));
    } else {
      control?.setValue([...current, value]);
    }
  }

  public onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.apiError = '';
    const formValue = {
      ...this.eventForm.value,
      start: new Date(this.eventForm.value.start).toISOString(),
    };

    this.eventsService.updateEvent({ ...formValue, _id: this.event._id }).subscribe({
      next: () => {
        this.toastr.success('Evento actualizado correctamente', 'Éxito');
        this.eventoActualizado.emit();
      },
      error: (err) => {
        this.apiError = err.error?.message || 'Error al actualizar el evento';
        this.toastr.error(this.apiError, 'Error');
      },
      complete: () => (this.isLoading = false),
    });
  }
}
