import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bien } from '../model/bien.interface';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://localhost:4200'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllBiens(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl);
  }
}
