import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  private apiUrl = 'http://localhost:3080/api';

  constructor(private http: HttpClient) { }

  getUserRentals(userMail: string): Observable<Location[]> {
    // Remplacez par l'URL appropriée de votre API
    return this.http.get<Location[]>(`${this.apiUrl}/location/${userMail}/locations`);
  }

  submitReview(rentalId: string, review: string): Observable<void> {
    // Remplacez par l'URL appropriée de votre API
    return this.http.post<void>(`${this.apiUrl}/location/${rentalId}/review`, { review });
  }
}
