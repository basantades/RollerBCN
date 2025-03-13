import { Component } from '@angular/core';
import { VelocidadGraficoComponent } from './velocidad-grafico/velocidad-grafico.component';
import { EdadesGraficoComponent } from './edades-grafico/edades-grafico.component';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss',
  imports: [VelocidadGraficoComponent, EdadesGraficoComponent], 
  standalone: true // También standalone para consistencia
})
export class GraficosComponent {}