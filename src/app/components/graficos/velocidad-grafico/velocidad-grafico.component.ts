import { Component, signal } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartsService } from '../../../services/charts.service';
import { take } from 'rxjs';
import { Chart } from '../../../interfaces/chart';

@Component({
  selector: 'app-velocidad-grafico',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './velocidad-grafico.component.html',
  styleUrl: './velocidad-grafico.component.scss'
})
export class VelocidadGraficoComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Velocidad Media (km/h)',
          color: '#fff'
        }
      },
      x: {
        title: {
          display: false,
          text: 'Nivel de Ruta',
          color: '#fff'
        }
      }
    },
    plugins: {
      legend: {
        display: false // ¡Esto oculta la leyenda!
      },
      title: {
        display: true,
        text: 'Velocidad Media en Rutas',
        color: '#fff',
        font: {
          size: 20
        },
        padding: {
          top: 10,
          bottom: 50 
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData = signal<ChartConfiguration['data']>({
    labels: [],
    datasets: [
      {
        data: [], 
        label: 'Velocidad Media en Rutas',
        backgroundColor: [
          '#00aeff',
          '#ff0080'
        ],
        borderColor: [
          '#ffffff00',
          '#ffffff00'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#33c4ff',
          '#ff3399'
        ]
      }
    ]
  });

  constructor(private chartsService: ChartsService) {
    // Cargar los datos al inicializar el componente
    this.chartsService.getChartByName('velocidad').pipe(take(1)).subscribe({
      next: (chart: Chart) => {
        const newData: ChartConfiguration['data'] = {
          labels: chart.data.map(item => item.label),
          datasets: [{
            ...this.barChartData().datasets[0], // Copia del dataset existente
            data: chart.data.map(item => item.value)
          }]
        };
        this.barChartData.set(newData); // Actualizamos la Signal
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        // Opcional: Manejar el error mostrando un mensaje al usuario
      }
    });
  }
}