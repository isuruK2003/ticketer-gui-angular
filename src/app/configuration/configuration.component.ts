import { Component, ChangeDetectorRef, inject } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SimulationConfiguration } from '../__models__/simulation.configuration';
import { SimulationService } from '../__services__/simulation.rest.service';

import { ValidationService } from '../__services__/validation.service';
import { ValidationConstraint } from '../__models__/validation.constraint';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  standalone: true,
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatStepperModule,
    MatCard,
    MatTabsModule,
    MatListModule
],
})

export class ConfigurationComponent {

  constructor(
    private formBuilder : FormBuilder,
    private simulationService : SimulationService,
    private validationService : ValidationService,
    private cdRef: ChangeDetectorRef,
    private dialog : MatDialog
  ) { }

  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = [
    "totalTicketsForCustomer", 
    "totalTicketsForVendor", 
    "totalVendors", 
    "totalConsumers", 
    "ticketReleaseRate", 
    "customerRetrievalRate", 
    "maxTicketCapacity"
  ];
  configurations : SimulationConfiguration[] = [];
  selectedRow : SimulationConfiguration | null = null;

  dataSource = new MatTableDataSource<SimulationConfiguration>(this.configurations);

  configForm: any;
  validationConstraints : Map<string, ValidationConstraint> | null = null;
  selectedConfiguration : SimulationConfiguration | null = null;

  ngOnInit() : void {
    this.initializeConfigForm();
    this.loadConfigurations(); // for table
    this.loadValidationConstraints()
  }

  loadConfigurations() {
    this.simulationService.getSavedConfigurations().subscribe(
      (response: any) => {
        this.configurations = response;
        this.dataSource = new MatTableDataSource(this.configurations);
        this.cdRef.detectChanges(); // updates table forcefully
      },
      (error: any) => {
        console.log(error);
        this.openSnackBar("Error occured while loading saved configurations")
      }
    );
  }

  selectRow(row:SimulationConfiguration) {
    this.selectedRow = row;
    // Update the form with the selected row's data
    this.configForm.patchValue({
      totalTicketsForVendor: row.totalTicketsForVendor,
      totalTicketsForCustomer: row.totalTicketsForCustomer,
      totalVendors: row.totalVendors,
      totalConsumers: row.totalConsumers,
      ticketReleaseRate: row.ticketReleaseRate,
      customerRetrievalRate: row.customerRetrievalRate,
      maxTicketCapacity: row.maxTicketCapacity
    });
    this.openDialog("Configuration Successfull", 
      "Now you can run the simulation in thedashboard")
  }

  private initializeConfigForm() {
    this.configForm = this.formBuilder.group({
      totalTicketsForVendor : ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      totalTicketsForCustomer : ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      totalVendors : ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      totalConsumers : ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      ticketReleaseRate : ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      customerRetrievalRate : ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      maxTicketCapacity : ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  loadValidationConstraints() {
    this.validationService.getValidationConstraints().subscribe(
      (response) => {
        this.validationConstraints = response;
        this.updateFormBuilderGroup();
        console.log("Validations loaded: ", response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateFormBuilderGroup() {
    if (this.validationConstraints) {
      for (const [key, constraint] of Object.entries(this.validationConstraints)) {
        const control = this.configForm.get(key);
        if (control) {
          control.setValidators([
            Validators.required,
            Validators.min(constraint.minValue),
            Validators.max(constraint.maxValue),
          ]);
          control.updateValueAndValidity();
        }
      }
    }
  }  

  submitForm(event: Event) : void {
    event.preventDefault();

    if (this.configForm?.valid) {
      let newConfig : SimulationConfiguration = this.configForm.value
      this.simulationService.configureSimulation(newConfig).subscribe({
        next: (response) => {
          this.openDialog("Configuration Successful", "Now you can run the simulation in thedashboard");
        },
        error: (error) => { 
          console.log("An error occured:", error)
          this.openDialog("Configuration Unsuccessful", 
            "An error occured while submitting the form. Please check your connection, or contact the administrator");
         }
      });

    } else {
      this.openDialog("Form Data is Invalid", "Please review the data you entered");
    }
  }

  saveForm() {
    if (this.configForm?.valid) {
      let newConfig : SimulationConfiguration = this.configForm.value;
      this.simulationService.saveConfiguration(newConfig).subscribe({
        next: (response) => {
          this.openDialog("Saved Successfully", "Now you can configure");
        },
        error: (error) => {
          console.log("An error occured:", error)
          this.openDialog("An error occured while saving the form",
            "An error occured while submitting the form. Please check your connection, or contact the administrator");
        }
      }
      );
    } else {
      this.openDialog("Form Data is Invalid", "Please review the data you entered");
    }
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
      console.log(title, content, 'result:', result);
    });
  }

  openSnackBar(message: string, action: string = "OK") {
    this.snackBar.open(message, action, {
      duration: 1500
    });
  }
}
