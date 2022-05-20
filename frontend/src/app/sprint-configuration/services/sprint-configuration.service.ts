import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintConfigurationService {

  constructor(private _http:HttpClient) { }
}
