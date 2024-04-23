import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from "../model/location.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3080/api';

  constructor(private http: HttpClient) { }

  getLocationsByBienId(bienId: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/locations/${bienId}`);
  }
}
