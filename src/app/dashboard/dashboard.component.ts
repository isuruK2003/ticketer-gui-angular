import { Component } from '@angular/core';
import { ControlsComponent } from "../controls/controls.component";
import { VisualizationComponent } from '../visualization/visualization.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    ControlsComponent, 
    VisualizationComponent
  ],
})
export class DashboardComponent {

}
