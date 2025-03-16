import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-filter',
//   imports: [],
//   templateUrl: './filter.component.html',
//   styleUrl: './filter.component.scss'
// })
// export class FilterComponent {

// }


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule], // Necesario para ngModel
  templateUrl: './filter.component.html', 
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() filtersChange = new EventEmitter<{ [key: string]: boolean }>();

  filters = {
    'Iniciación': true,
    'Intermedio': true,
    'Avanzado': true
  };

  emitFilters(): void {
    this.filtersChange.emit(this.filters);
  }
}