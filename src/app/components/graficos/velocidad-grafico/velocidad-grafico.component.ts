import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-velocidad-grafico',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './velocidad-grafico.component.html',
  styleUrl: './velocidad-grafico.component.scss'
})
export class VelocidadGraficoComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Permite controlar mejor el tamaño
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
          bottom: 50 // Aumenta el margen inferior del título
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [ 'Intermedio', 'Avanzado'],
    datasets: [
      {
        data: [18, 30], // Velocidades medias en km/h por nivel
        label: 'Velocidad Media en Rutas',
        backgroundColor: [
          // '#00b300',
          '#00aeff',
          '#ff0080'
        ],
        borderColor: [
          '#ffffff00',
          '#ffffff00',
          '#ffffff00'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          // '#00b300',
          '#33c4ff',
          '#ff3399'
        ]
      }
    ]
  };

  ngOnInit(): void {}
}