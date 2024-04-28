import {Component, Injectable, OnInit} from '@angular/core';
import {Bien} from "../model/bien.interface";
import {SearchFormService} from "../services/search-formService";
import {BienService} from "../services/bienService";

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent implements OnInit {
  logements: Bien[] = [];

  constructor(private housingService: BienService, private searchFormService: SearchFormService) {
    this.searchFormService.currentSearchForm.subscribe(searchForm => {
      const body = {"criteria": searchForm};
      this.housingService.getBienWithCriteria(body).subscribe((biens: Bien[]) => {
        this.logements = biens;
      });
    });
  }

  ngOnInit() {
    this.housingService.getAllBiens().subscribe((biens: Bien[]) => {
      this.logements = biens;
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }

}
