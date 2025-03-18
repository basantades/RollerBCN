import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { Ubicacion } from '../../../interfaces/ubicacion';
import { UbicacionesService } from '../../../services/ubicaciones.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {
  locations: Ubicacion[] = [];

  eventForm: FormGroup;
  categories = ['clase', 'ruta', 'evento', 'reunion'];
  levels = ['Iniciación', 'Intermedio', 'Avanzado'];

  constructor(
    private ubicacionesService: UbicacionesService,
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router,
    private toastr: ToastrService
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

  
  isLoading = false;
apiError = '';

onSubmit() {
  if (this.eventForm.invalid) {
    this.eventForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.apiError = '';

 // ✅ Clonamos el form value para no tocar el original
 const formValue = { ...this.eventForm.value };

 // ✅ Convertimos la fecha a formato ISO UTC
 formValue.start = new Date(formValue.start).toISOString();
 
  this.eventsService.createEvent(this.eventForm.value).subscribe({
    next: (res) => {
      console.log('Evento creado:', res);
      this.toastr.success('Evento creado correctamente', 'Éxito');
      this.eventForm.reset();
      // this.router.navigate(['/']); 
    },
    error: (err) => {
      console.error('Error al crear el evento', err);
      this.apiError = err.error?.message || 'Error al crear el evento';
      this.toastr.error(this.apiError, 'Error');

    },
    complete: () => {
      this.isLoading = false;
    }
  });
}

toggleCategory(value: string) {
  const selected = this.eventForm.get('category')?.value || [];
  if (selected.includes(value)) {
    this.eventForm.patchValue({ category: selected.filter((v: string) => v !== value) });
  } else {
    this.eventForm.patchValue({ category: [...selected, value] });
  }
}

toggleLevel(value: string) {
  const selected = this.eventForm.get('level')?.value || [];
  if (selected.includes(value)) {
    this.eventForm.patchValue({ level: selected.filter((v: string) => v !== value) });
  } else {
    this.eventForm.patchValue({ level: [...selected, value] });
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

