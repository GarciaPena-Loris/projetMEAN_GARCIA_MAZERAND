import {Component, Injectable, OnInit} from '@angular/core';
import {Bien} from "../model/bien.interface";
import {SelectorService} from "./selector.service";
import {SearchFormService} from "../search-form/search-formService";

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

  constructor(private housingService: SelectorService, private searchFormService: SearchFormService) {
    this.searchFormService.currentSearchForm.subscribe(searchForm => {
      const body = {"criteria": searchForm};
      this.housingService.getBienWithCriteria(body).subscribe((biens: Bien[]) => {
        console.log("BienWithCriteria", biens);
        this.logements = biens;
      });
    });
  }

  ngOnInit() {
    this.housingService.getAllBiens().subscribe((biens: Bien[]) => {
      console.log("Allbien", biens);
      this.logements = biens;
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }

}
