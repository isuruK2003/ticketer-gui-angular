import { Component, ChangeDetectorRef } from '@angular/core';
import { Chart } from "chart.js";
import { registerables } from 'chart.js';
import { SimulationStatus } from '../__models__/simulation.status';
import { SimulationWebsocketService } from '../__services__/simulation.ws.service';


Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.scss',
  imports: [],
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
      label: 'TicketPool',
      data: this.stimulationStatusList,
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  config: any = {
    type: 'line',
    data: this.data,
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
      this.timeCoordinates = this.simulationWebsocketService.timeCoordinates;
      // this.previousTimeCoordinate = this.simulationWebsocketService.previousTimeCoordinate;

      this.data.labels = this.timeCoordinates; // Update the chart labels
      this.data.datasets[0].data = this.stimulationStatusList; // Update the chart data

      // Trigger change detection and update the chart
      this.cdRef.detectChanges();
      this.chart.update(); // Explicitly update the chart to reflect changes
    });
  }
}
