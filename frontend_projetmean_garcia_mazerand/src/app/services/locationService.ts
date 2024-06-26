import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Location} from "../model/location.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3080/api';

  constructor(private http: HttpClient) {
  }

  getLocationsByBienId(bienId: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/locations/${bienId}`);
  }

  newLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/location/new`, {location});
  }

  getReservations(bienId: number): Observable<{dateDebut: Date, dateFin: Date}[]> {
    return this.http.get<{dateDebut: Date, dateFin: Date}[]>(`${this.apiUrl}/location/${bienId}/reservations`);
  }

  getUserRentals(userMail: string): Observable<Location[]> {
    // Remplacez par l'URL appropriée de votre API
    return this.http.get<Location[]>(`${this.apiUrl}/location/${userMail}/locations`);
  }

  submitReview(rentalId: number, review: string): Observable<void> {
    // Remplacez par l'URL appropriée de votre API
    return this.http.post<void>(`${this.apiUrl}/location/${rentalId}/review`, { review });
  }
}
