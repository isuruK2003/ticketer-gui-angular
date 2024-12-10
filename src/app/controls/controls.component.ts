import { Component, inject } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';

import { SimulationService } from '../__services__/simulation.rest.service';
import { DialogComponent } from '../dialog/dialog.component';

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

  constructor(private simulationService : SimulationService, private dialog : MatDialog) { }

  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  startUpSelections = this.formBuilder.group({
    startVendors: true,
    startConsumers: true
  })

  hasStarted = false;

  start() : void {
    if (this.hasStarted) {
      this.openDialog("Simulation is already going", "If you want, you can stop with the stop button")
      return;
    }
    if (this.startUpSelections.get('startVendors')?.value) {
      this.initializeVendors();
    }
    if (this.startUpSelections.get('startConsumers')?.value) {
      this.initializeConsumers();
    }
  }

  stop() : void {
    this.stopVendors();
    this.stopConsumers();
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action);
  }

  openDialog(title:string, content:string, confirmButtonText:string="OK"): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        content: content,
        confirmButton: true,
        confirmButtonText: confirmButtonText,
      },
    }).afterClosed().subscribe((result:any) => {
      console.log('Dialog 1 result:', result);
    });
  }

  initializeConsumers() : void {
    this.simulationService.initializeConsumers().subscribe({
      next: (response) => {
        console.log("Consumers initialized successfully", response);
        this.openSnackBar("Consumers initialized successfully");
        this.startConsumers();
      },
      error: (error) => {
        console.log("An error occurred while initializing consumers", error);
        this.openSnackBar("An error occurred while initializing consumers");
      }
    });
  }
  
  initializeVendors() : void {
    this.simulationService.initializeVendors().subscribe({
      next: (response) => {
        console.log("Vendors initialized successfully", response);
        this.openSnackBar("Vendors initialized successfully");
        this.startVendors();
      },
      error: (error) => {
        console.log("An error occurred while initializing vendors", error);
        this.openSnackBar("An error occurred while initializing vendors");
      }
    });
  }
  
  startVendors() : void {
    this.simulationService.startVendors().subscribe({
      next: (response) => {
        console.log("Vendors started successfully", response);
        this.openSnackBar("Vendors started successfully");
      },
      error: (error) => {
        console.log("An error occurred while starting vendors", error);
        this.openSnackBar("An error occurred while starting vendors");
      }
    });
  }
  
  startConsumers() : void {
    this.simulationService.startConsumers().subscribe({
      next: (response) => {
        console.log("Consumers started successfully", response);
        this.openSnackBar("Consumers started successfully");
      },
      error: (error) => {
        console.log("An error occurred while starting consumers", error);
        this.openSnackBar("An error occurred while starting consumers");
      }
    });
  }
  
  stopVendors() : void {
    this.simulationService.stopVendors().subscribe({
      next: (response) => {
        console.log("Vendors stopped successfully", response);
        this.openSnackBar("Vendors stopped successfully");
        this.clearVendors();
      },
      error: (error) => {
        console.log("An error occurred while stopping vendors", error);
        this.openSnackBar("An error occurred while stopping vendors");
      }
    });
  }
  
  stopConsumers() : void {
    this.simulationService.stopConsumers().subscribe({
      next: (response) => {
        console.log("Consumers stopped successfully", response);
        this.openSnackBar("Consumers stopped successfully");
        this.clearConsumers();
      },
      error: (error) => {
        console.log("An error occurred while stopping consumers", error);
        this.openSnackBar("An error occurred while stopping consumers");
      }
    });
  }
  
  clearVendors() : void {
    this.simulationService.clearVendors().subscribe({
      next: (response) => {
        console.log("Vendors cleared successfully", response);
        this.openSnackBar("Vendors cleared successfully");
      },
      error: (error) => {
        console.log("An error occurred while clearing vendors", error);
        this.openSnackBar("An error occurred while clearing vendors");
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
        this.openSnackBar("An error occurred while clearing consumers");
      }
    });
  }
}
