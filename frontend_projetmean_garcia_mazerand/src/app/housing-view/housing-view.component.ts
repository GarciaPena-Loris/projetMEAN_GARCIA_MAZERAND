import {Component, Input} from '@angular/core';
import {LocationService} from "./locationService";
import {MatDialog} from "@angular/material/dialog";
import {Bien} from "../model/bien.interface";
import {Location} from "../model/location.interface";
import {Router} from "@angular/router";

export interface Tile {
  url: string;
  colspan: number;
  rowspan: number;
}

@Component({
  selector: 'app-housing-view',
  templateUrl: './housing-view.component.html',
  styleUrl: './housing-view.component.css'
})
export class HousingViewComponent {
  logement: Bien;
  showDetails: boolean = false;
  locations: Location[] = [];

  constructor(public dialog: MatDialog, private locationService: LocationService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      logement: Bien
    }
    this.logement = state.logement;

    if (this.logement && this.logement.idBien) {
      this.locationService.getLocationsByBienId(this.logement.idBien)
        .subscribe(locations => {
          this.locations = locations;
        });
    }
  }

  getTiles(): Tile[] {
    const tiles: Tile[] = [];
    // Première image principale
    tiles.push({url: this.logement.imagePrincipale + '.jpg', colspan: 2, rowspan: 2});
    // Les autres images
    this.logement.images.slice(1).forEach(image => {
      tiles.push({url: image + '.jpg', colspan: 1, rowspan: 1});
    });
    return tiles;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  openRentDialog() {
    // Implémentez la logique pour ouvrir une boîte de dialogue pour la location du bien
  }
}
