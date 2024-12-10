import { Component, ChangeDetectorRef } from '@angular/core';
import { SimulationWebsocketService } from '../__services__/simulation.ws.service';
import { SimulationStatus } from '../__models__/simulation.status';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-stats',
  imports: [
    MatCard
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  constructor(
    private simulationWebsocketService: SimulationWebsocketService,
    private cdRef: ChangeDetectorRef
  ) { }

  simulationStatus: SimulationStatus | null = null;

  ngOnInit(): void {
    this.enableChangeDetection();
  }

  private enableChangeDetection(): void {
    this.simulationWebsocketService.simulationStatusChaged.subscribe(() => {
      this.simulationStatus = this.simulationWebsocketService.simulationStatus;
      this.cdRef.detectChanges();
    });
  }
}
