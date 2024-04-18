import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  searchForm = new FormGroup({
    localisation: new FormControl(''),
    typeLogement: new FormControl(''),
    prixMax: new FormControl(''),
    // dateDebut: new FormControl(''),
    // dateFin: new FormControl(''),
    chambreMin: new FormControl(''),
    couchageMin: new FormControl(''),
    distanceCentre: new FormControl(''),

  });
}
