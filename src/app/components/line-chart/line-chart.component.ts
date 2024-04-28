import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public chart!: Chart;

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit(): void {


    const data = {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Ventas',
        data: [20, 80, 200, 6],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart("chart", {
      type: 'line' as ChartType,
      data: data
    });

      this.getData();
      this.escucharSocket();
   /* setInterval(() => {
      const newData = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ];

      this.chart.data.datasets[0].data = newData;
      this.chart.update(); // Actualizar el gráfico después de asignar los nuevos datos
    }, 3000);
    */
  }


  getData() {
    this.http.get('http://localhost:5000/grafica').subscribe(
      (data: any) => {
        console.log(data);
        this.chart.data.datasets[0].data = data;
        this.chart?.update();
      }

    )
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe(
      (data: any) => {
        console.log('socket', data);
        this.chart.data.datasets[0].data = data;
        this.chart?.update();
      }
    )
  }


}
