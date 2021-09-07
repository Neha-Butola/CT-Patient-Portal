import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchpostService {
  api = '/api/medication-and-allergies/';
  constructor(private httpClient: HttpClient) {}
}
