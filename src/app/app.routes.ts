import { Routes } from '@angular/router';

import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: ConfigurationComponent },
    { path: 'configure', component: ConfigurationComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'about', component: AboutComponent},
];
