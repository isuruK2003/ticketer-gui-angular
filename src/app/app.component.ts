import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink,
    MatButton
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ticketer-gui';
}
