import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bien} from '../model/bien.interface';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://localhost:3080/api';

  constructor(private http: HttpClient) {
  }

  getAllBiens(): Observable<Bien[]> {
    const body = {"criteria": {"prixMax": 30}}
    return this.http.post<Bien[]>(this.apiUrl + '/biens/search', body);
  }
}
