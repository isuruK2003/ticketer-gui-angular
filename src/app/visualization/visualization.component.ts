import { Component, ChangeDetectorRef } from '@angular/core';
import { Chart } from "chart.js";
import { registerables } from 'chart.js';
import { SimulationStatus } from '../__models__/simulation.status';
import { SimulationWebsocketService } from '../__services__/simulation.ws.service';
import { MatCardModule } from '@angular/material/card';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss',
  imports: [
    MatCardModule
  ],
})
export class VisualizationComponent {

  constructor(
    private simulationWebsocketService: SimulationWebsocketService,
    private cdRef: ChangeDetectorRef
  ) { }

  simulationStatus: SimulationStatus | null = null;
  stimulationStatusList: SimulationStatus[] = [];
  timeCoordinates: number[] = [];
  previousTimeCoordinate: number = 0;

  data = {
    labels: this.timeCoordinates,
    datasets: [{
      label: 'TicketPool Size',
      data: this.stimulationStatusList,
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  config: any = {
    type: 'line',
    data: this.data,
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          grid: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  };

  chart: any;

  ngOnInit(): void {
    this.chart = new Chart('TicketPool', this.config);
    this.simulationWebsocketService.connect()
      .then((response: any) => { console.log("Connected to WebSocket: ", response) })
      .catch((error: any) => { console.log(error) });
    this.enableChangeDetection();
  }

  private enableChangeDetection(): void {
    this.simulationWebsocketService.simulationStatusChaged.subscribe(() => {
      
      this.simulationStatus = this.simulationWebsocketService.simulationStatus;
      this.stimulationStatusList = this.simulationWebsocketService.stimulationStatusList;
      this.timeCoordinates = this.simulationWebsocketService.timeCoordinates;;
      this.data.labels = this.timeCoordinates;
      this.data.datasets[0].data = this.stimulationStatusList;

      this.cdRef.detectChanges();
      this.chart.update();
    });
  }
}
