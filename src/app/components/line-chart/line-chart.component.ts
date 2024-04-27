import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public chart!: Chart;

  constructor() { }

  ngOnInit(): void {
    const data = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Ventas',
        data: [0, 0, 0, 0],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart("chart", {
      type: 'line' as ChartType,
      data: data
    });

    setInterval(() => {
      const newData = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ];

      this.chart.data.datasets[0].data = newData;
      this.chart.update(); // Actualizar el gráfico después de asignar los nuevos datos
    }, 3000);
  }
}
