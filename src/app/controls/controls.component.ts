import { Component } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { SimulationService } from '../__services__/simulation.rest.service';

@Component({
  standalone: true,
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  imports: [MatGridListModule,
    MatButtonModule,
    ],
})
export class ControlsComponent {

  constructor(
    private simulationService : SimulationService,
  ) { }

  initializeConsumers() {
    this.simulationService.initializeConsumers().subscribe({
      next: (response) => {
        console.log("Consumers initialized successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while initializing consumers", error);
      }
    });
  }
  
  initializeVendors() {
    this.simulationService.initializeVendors().subscribe({
      next: (response) => {
        console.log("Vendors initialized successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while initializing vendors", error);
      }
    });
  }
  
  startVendors() {
    this.simulationService.startVendors().subscribe({
      next: (response) => {
        console.log("Vendors started successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while starting vendors", error);
      }
    });
  }
  
  startConsumers() {
    this.simulationService.startConsumers().subscribe({
      next: (response) => {
        console.log("Consumers started successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while starting consumers", error);
      }
    });
  }
  
  stopVendors() {
    this.simulationService.stopVendors().subscribe({
      next: (response) => {
        console.log("Vendors stopped successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while stopping vendors", error);
      }
    });
  }
  
  stopConsumers() {
    this.simulationService.stopConsumers().subscribe({
      next: (response) => {
        console.log("Consumers stopped successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while stopping consumers", error);
      }
    });
  }
  
  clearVendors() {
    this.simulationService.clearVendors().subscribe({
      next: (response) => {
        console.log("Vendors cleared successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while clearing vendors", error);
      }
    });
  }
  
  clearConsumers() {
    this.simulationService.clearConsumers().subscribe({
      next: (response) => {
        console.log("Consumers cleared successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while clearing consumers", error);
      }
    });
  }
}
