import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  private searchFormSource = new BehaviorSubject<any>({});
  currentSearchForm = this.searchFormSource.asObservable();

  constructor() { }

  changeSearchForm(searchForm: any) {
    this.searchFormSource.next(searchForm);
  }
}
