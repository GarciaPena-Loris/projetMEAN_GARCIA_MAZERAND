import {Component, Input} from '@angular/core';
import {Bien} from '../model/bien.interface';
import {MatDialog} from "@angular/material/dialog";
import {RentComponent} from "../rent/rent.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrl: './housing-card.component.css',

})
export class HousingCardComponent {
  @Input() logement?: Bien;
  showDetails = false;

  constructor(private dialog: MatDialog, private router: Router) {
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  openHousingView() {
    let navigationExtras: NavigationExtras = {
      state: {
        logement: this.logement
      }
    };
    this.router.navigate(['/housingView'], navigationExtras);
  }

  openRentDialog() {
    const dialogRef = this.dialog.open(RentComponent, {
      width: '800px',
      height: '600px',
      data: this.logement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/user-rentals']);
      }
    });
  }

    protected readonly Math = Math;
}
