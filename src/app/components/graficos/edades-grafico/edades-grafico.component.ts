import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-edades-grafico',
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './edades-grafico.component.html',
  styleUrl: './edades-grafico.component.scss'
})
export class EdadesGraficoComponent implements OnInit {
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
  public pieChartData: ChartConfiguration['data'] = {
    labels: ['5-14', '15-24', '25-34', '35-44', '45+'],
    datasets: [
      {
        data: [15, 20, 35, 22, 8], 
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
  };

  ngOnInit(): void {}
}
