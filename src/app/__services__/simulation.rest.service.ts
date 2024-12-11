import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { SimulationConfiguration } from '../__models__/simulation.configuration';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  baseUrl: string = AppSettings.API_ENDPOINT + '/simulation';

  constructor(private http: HttpClient) { }

  configureSimulation(newConfig : SimulationConfiguration) {
    return this.http.post<SimulationConfiguration>(this.baseUrl + "/configure", newConfig);
  }

  saveConfiguration(currentConfig : SimulationConfiguration) {
    return this.http.post<SimulationConfiguration>(this.baseUrl + "/save-configuration", currentConfig);
  }

  getSavedConfigurations() {
    return this.http.get<null>(this.baseUrl + '/get-saved-configurations')
  }

  initializeConsumers() {
    return this.http.get<null>(this.baseUrl + '/initialize-consumers');
  }
  
  initializeVendors() {
    return this.http.get<null>(this.baseUrl + '/initialize-vendors'); 
  }
  
  startVendors() {
    return this.http.get<null>(this.baseUrl + '/start-vendors');
  }
  
  startConsumers() {
    return this.http.get<null>(this.baseUrl + '/start-consumers');
  }
  
  stopVendors() {
    return this.http.get<null>(this.baseUrl + '/stop-vendors');
  }
  
  stopConsumers() {
    return this.http.get<null>(this.baseUrl + '/stop-consumers');
  }
  
  clearVendors() {
    return this.http.get<null>(this.baseUrl + '/clear-vendors');
  }
  
  clearConsumers() {
    return this.http.get<null>(this.baseUrl + '/clear-consumers');
  }

  clearTicketPool() {
    return this.http.get<null>(this.baseUrl + '/clear-ticket-pool');
  }
}
