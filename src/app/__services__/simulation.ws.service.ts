import { Injectable, EventEmitter } from '@angular/core';

import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import { AppSettings } from '../app.settings';
import { SimulationStatus } from '../__models__/simulation.status';


@Injectable({
  providedIn: 'root'
})
export class SimulationWebsocketService {
  private socket = new SockJS(AppSettings.SOCKJS_ENDPOINT);
  private stompClient = Stomp.over(this.socket);
  
  public simulationStatusChaged = new EventEmitter<void>();
  public simulationStatus : SimulationStatus | null = null;
  public stimulationStatusList : SimulationStatus[] = [];
  public timeCoordinates : number[] = [];

  constructor() { }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stompClient.connect({}, (frame: any) => {
        console.log(frame);
        this.subscribeToSimulationStatus();
        resolve(); // if successful connection, then resolve 
      }, (error: any) => {
        reject(error); //  if connection fails, then reject
      });
    });
  }

  private subscribeToSimulationStatus(): void {
    this.stompClient.subscribe('/topic/simulation/simulation-status',
      (response: any) => {
        const receivedStatus = JSON.parse(response.body);
        console.log(receivedStatus);
        this.simulationStatus = receivedStatus;
        this.stimulationStatusList.push(receivedStatus["totalTickets"]);
        const time = this.timeCoordinates.length === 0 ? 0 : this.timeCoordinates[this.timeCoordinates.length - 1] + 1;
        this.timeCoordinates.push(time);        
        this.simulationStatusChaged.emit();
      });
  }
}
