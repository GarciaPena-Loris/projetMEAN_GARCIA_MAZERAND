import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {SearchFormService} from "./search-formService";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  searchForm = this.fb.group({
    commune: [''],
    nbCouchagesMin: [''],
    dateDebut: [''],
    dateFin: [''],
    prixMax: [''],
    typeLogement: [''],
    nbChambresMin: [''],
    distanceMax: ['']
  });

  constructor(private fb: FormBuilder, private searchFormService: SearchFormService) {
  }

  onSubmit() {
    this.searchFormService.changeSearchForm(this.searchForm.value);
  }
}
