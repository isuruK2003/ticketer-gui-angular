import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { ValidationConstraint } from '../__models__/validation.constraint';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  baseUrl: string = AppSettings.API_ENDPOINT + '/validation';

  constructor(private http: HttpClient) { }

  getValidationConstraints() {
    return this.http.get<Map<string, ValidationConstraint>>(this.baseUrl + '/all')
  }
}