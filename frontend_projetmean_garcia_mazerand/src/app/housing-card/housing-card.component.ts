import { Component, Input } from '@angular/core';
import { Bien } from '../model/bien.interface';
import {MatDialog} from "@angular/material/dialog";
import {RentComponent} from "../rent/rent.component";

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrl: './housing-card.component.css',

})
export class HousingCardComponent {
  @Input() logement?: Bien;
  showDetails = false;
  constructor(private dialog: MatDialog) {}

  toggleDetails() {
    this.showDetails = !this.showDetails;
}

  openRentDialog() {
    const dialogRef = this.dialog.open(RentComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur a cliqué sur le bouton "Louer"
        // Ajoutez ici le code pour louer le logement
      }
    });
}
}
