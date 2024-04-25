import {Component} from '@angular/core';
import {LocationService} from "./locationService";
import {MatDialog} from "@angular/material/dialog";
import {Bien} from "../model/bien.interface";
import {Location} from "../model/location.interface";
import {Router} from "@angular/router";
import {RentComponent} from "../rent/rent.component";
import {ImageDialogComponent} from "./image-dialog.component";

export interface Tile {
  url: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-housing-view',
  templateUrl: './housing-view.component.html',
  styleUrl: './housing-view.component.css'
})
export class HousingViewComponent {
  logement: Bien;
  locations: Location[] = [];
  moyenneNote = 0;
  nombreCommentaires = 0;

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
          this.moyenneNote = parseFloat((locations.reduce((acc, location) => acc + location.avis[0].note, 0) / locations.length).toFixed(1));
          this.nombreCommentaires = locations.length;
        });
    }
  }

  formatDate(timestamp: number): string {
    let date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR');
  }

  getTiles(): Tile[] {
    const tiles: Tile[] = [];
    // Première image principale
    tiles.push({url: this.logement.imagePrincipale + '.jpg', cols: 2, rows: 2});
    // Les autres images
    this.logement.images.slice(1).forEach(image => {
      tiles.push({url: image + '.jpg', cols: 1, rows: 1});
    });
    return tiles;
  }

  openImageDialog(url: string): void {
    console.log(url);
    this.dialog.open(ImageDialogComponent, {
      data: { url },
      panelClass: 'image-dialog',
    });
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

  protected readonly Math = Math;
}
