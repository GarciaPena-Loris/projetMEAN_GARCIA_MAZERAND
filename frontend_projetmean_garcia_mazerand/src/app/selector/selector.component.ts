import {Component, Injectable, OnInit} from '@angular/core';
import {Bien} from "../model/bien.interface";
import {SelectorService} from "./selector.service";

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

  constructor(private housingService: SelectorService) {
  }

  ngOnInit() {
    this.housingService.getAllBiens().subscribe((biens: Bien[]) => {
      this.logements = biens;
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }

}
