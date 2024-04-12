import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-search-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogActions,
    FormsModule,
    MatDialogTitle,
    MatInput,
    MatButton,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  // localisation: string = '';
  // typeLogement: string = '';
  // prixMax: number = 0;
  // // dateDebut: string = '';
  // // dateFin: string = '';
  // chambreMin: number = 0;
  // couchageMin: number = 0;
  // distanceCentre: number = 0;

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
