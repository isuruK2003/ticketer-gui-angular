import { Component, inject } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';

import { SimulationService } from '../__services__/simulation.rest.service';

@Component({
  standalone: true,
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCard
    ],
})
export class ControlsComponent {

  constructor(private simulationService : SimulationService) { }

  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  startUpSelections = this.formBuilder.group({
    startVendors: true,
    startConsumers: true
  })

  start() : void {
    if (this.startUpSelections.get('startVendors')?.value) {
      this.initializeVendors();
    }
    if (this.startUpSelections.get('startConsumers')?.value) {
      this.initializeConsumers();
    }
    this.openSnackBar("Simulation started successfully")
  }

  stop() : void {
     if (this.startUpSelections.get('startVendors')?.value) {
      this.stopVendors();
    }
    if (this.startUpSelections.get('startConsumers')?.value) {
      this.stopConsumers();
    }
    this.simulationService.clearTicketPool();
    this.openSnackBar("Simualtion stopped successfully")
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 1500
    });
  }

  initializeConsumers() : void {
    this.simulationService.initializeConsumers().subscribe({
      next: (response) => {
        console.log("Consumers initialized successfully", response);
        this.startConsumers();
      },
      error: (error) => {
        console.log("An error occurred while initializing consumers", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  initializeVendors() : void {
    this.simulationService.initializeVendors().subscribe({
      next: (response) => {
        console.log("Vendors initialized successfully", response);
        this.startVendors();
      },
      error: (error) => {
        console.log("An error occurred while initializing vendors", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  startVendors() : void {
    this.simulationService.startVendors().subscribe({
      next: (response) => {
        console.log("Vendors started successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while starting vendors", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  startConsumers() : void {
    this.simulationService.startConsumers().subscribe({
      next: (response) => {
        console.log("Consumers started successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while starting consumers", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  stopVendors() : void {
    this.simulationService.stopVendors().subscribe({
      next: (response) => {
        console.log("Vendors stopped successfully", response);
        this.clearVendors();
      },
      error: (error) => {
        console.log("An error occurred while stopping vendors", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  stopConsumers() : void {
    this.simulationService.stopConsumers().subscribe({
      next: (response) => {
        console.log("Consumers stopped successfully", response);
        this.clearConsumers();
      },
      error: (error) => {
        console.log("An error occurred while stopping consumers", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  clearVendors() : void {
    this.simulationService.clearVendors().subscribe({
      next: (response) => {
        console.log("Vendors cleared successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while clearing vendors", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
  
  clearConsumers() : void {
    this.simulationService.clearConsumers().subscribe({
      next: (response) => {
        console.log("Consumers cleared successfully", response);
      },
      error: (error) => {
        console.log("An error occurred while clearing consumers", error);
        this.openSnackBar(error.error.message);
      }
    });
  }
}
