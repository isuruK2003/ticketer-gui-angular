import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { SimulationService } from '../__services__/simulation.rest.service';
import { SimulationConfiguration } from '../__models__/simulation.configuration';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule, 
    MatCheckboxModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(
    private simulationService : SimulationService,
    private cdr: ChangeDetectorRef
  ) {}

  configurations : SimulationConfiguration[] = [];

  displayedColumns: string[] = [
    // "id", 
    "totalTicketsForCustomer", 
    "totalTicketsForVendor", 
    "totalVendors", 
    "totalConsumers", 
    "ticketReleaseRate", 
    "customerRetrievalRate", 
    "maxTicketCapacity"
  ];
  dataSource = new MatTableDataSource<SimulationConfiguration>(this.configurations);
  selection = new SelectionModel<SimulationConfiguration>(true, []);

  ngOnInit() {
    this.loadConfigurations()
  }

  loadConfigurations() {
    this.simulationService.getSavedConfigurations().subscribe(
      (response: any) => {
        this.configurations = response;
        this.dataSource = new MatTableDataSource(this.configurations);
        this.cdr.detectChanges(); // Force update
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SimulationConfiguration): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.customerRetrievalRate + 1}`;
  }
}
