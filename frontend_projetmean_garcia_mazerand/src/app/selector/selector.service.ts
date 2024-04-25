import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bien} from '../model/bien.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectorService {
  private apiUrl = 'http://localhost:3080/api';

  constructor(private http: HttpClient) {
  }

  getAllBiens(): Observable<Bien[]> {
    const body = {"criteria": ""}
    return this.http.post<Bien[]>(this.apiUrl + '/biens/search', body);
  }

  getBienWithCriteria(criteria: any): Observable<Bien[]> {
    return this.http.post<Bien[]>(this.apiUrl + '/biens/search', criteria);
  }
}
