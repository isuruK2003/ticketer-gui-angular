import { Component, ChangeDetectorRef } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SimulationConfiguration } from '../__models__/simulation.configuration';
import { SimulationService } from '../__services__/simulation.rest.service';
import { TableComponent } from "../table/table.component";

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
    TableComponent
],
})
export class ConfigurationComponent {
  configForm : any;

  constructor(
    private formBuilder : FormBuilder,
    private simulationService : SimulationService
  ) { }

  ngOnInit() : void {
    this.initializeConfigForm();
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

  submitForm(event: Event) : void {
    event.preventDefault();
    console.log(typeof(this.configForm.value));
    if (this.configForm?.valid) {
      console.log('Form Submitted', this.configForm.value);
      let newConfig : SimulationConfiguration = this.configForm.value
      this.simulationService.configureSimulation(newConfig).subscribe({
        next: (response) => { console.log(response) },
        error: (error) => { console.log("An error occured:", error) }
      });
    } else {
      console.log("Form data are not valid");
    }
  }
}
