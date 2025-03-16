import { Component, OnInit, signal } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartsService } from '../../../services/charts.service';
import { Chart } from '../../../interfaces/chart';
import { take } from 'rxjs';
@Component({
  selector: 'app-edades-grafico',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './edades-grafico.component.html',
  styleUrl: './edades-grafico.component.scss'
})
export class EdadesGraficoComponent {
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          color: '#fff',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: ['Distribución de Edades', 'aproximada en las Clases'],
        color: '#fff',
        font: {
          size: 20
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%` 
        }
      }
    }
  };

  public pieChartType: ChartType = 'doughnut'; 
  public pieChartData = signal<ChartConfiguration['data']>({
        labels: [],
    datasets: [
      {
        data: [], 
        backgroundColor: [
          '#ff0080', 
          '#cc00ff', 
          '#00aeff', 
          '#0077cc', 
          '#004080'  
        ],
        borderColor: [
          '#ff0080',
          '#cc00ff',
          '#00aeff',
          '#0077cc',
          '#004080'
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          '#ff3399',
          '#e633ff',
          '#33c4ff',
          '#3399ff',
          '#3366b3'
        ]
      }
    ]
  });

  constructor(private chartsService: ChartsService) {
    // Cargar los datos al inicializar el componente
    this.chartsService.getChartByName('edades').pipe(take(1)).subscribe({
      next: (chart: Chart) => {
        const newData: ChartConfiguration['data'] = {
          labels: chart.data.map(item => item.label),
          datasets: [{
            ...this.pieChartData().datasets[0], // Copia del dataset existente
            data: chart.data.map(item => item.value)
          }]
        };
        this.pieChartData.set(newData); // Actualizamos la Signal
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        // Opcional: Manejar el error mostrando un mensaje al usuario
      }
    });
  }
}

