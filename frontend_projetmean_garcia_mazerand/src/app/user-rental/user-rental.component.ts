// user-rentals.component.ts
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../model/user.interface";
import {Location} from "../model/location.interface";
import {LocationService} from "../services/locationService";
import {BienService} from "../services/bienService";
import {Bien} from "../model/bien.interface";
import {ReviewDialogComponent} from "./review-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarComponent} from "../auth-card/snackBar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {forkJoin, map} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";

interface CustomLocation {
  location: Location;
  bien: Bien;
  dateDebut: Date;
  dateFin: Date;
}

@Component({
  selector: 'app-user-rental',
  templateUrl: './user-rental.component.html',
  styleUrls: ['./user-rental.component.css']
})
export class UserRentalComponent implements OnInit {
  customLocations: CustomLocation[] = [];
  user: User | undefined;

  constructor(private router: Router, private dialog: MatDialog, private locationService: LocationService, private bienServiceprivate: BienService, private authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.authService.currentUserInfo) {
      this.customLocations = [];
      const userEmail = this.authService.currentUserInfo.mail;
      this.user = this.authService.currentUserInfo;
      this.locationService.getUserRentals(userEmail).subscribe(locations => {
        const requests = locations.map((location: Location) => {
          return this.bienServiceprivate.getBienById(location.idBien).pipe(map(bien => {
            const dateDebut = new Date(location.dateDebut);
            const dateFin = new Date(location.dateFin);
            return {location, bien, dateDebut, dateFin};
          }));
        });

        forkJoin(requests).subscribe((customLocations: CustomLocation[]) => {
          this.customLocations = customLocations;
          console.log(this.customLocations);

          // Trier les réservations
          this.customLocations.sort((a, b) => {
            const statusA = this.getReservationStatus(a.dateDebut, a.dateFin);
            const statusB = this.getReservationStatus(b.dateDebut, b.dateFin);

            // Attribuer un poids à chaque statut
            const statusWeight: { [key: string]: number } = {
              'en cours': 1,
              'à venir': 2,
              'passée': 3
            };

            return statusWeight[statusA] - statusWeight[statusB];
          });
        });
      });
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  calculateNights(dateDebut: Date, dateFin: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // heures*minutes*secondes*millisecondes
    const diffDays = Math.round(Math.abs((dateDebut.getTime() - dateFin.getTime()) / oneDay));
    return diffDays + 1;
  }

  calculatePrice(pricePerNight: number, dateDebut: Date, dateFin: Date): string {
    const oneDay = 24 * 60 * 60 * 1000; // heures*minutes*secondes*millisecondes
    const diffDays = Math.round(Math.abs((dateDebut.getTime() - dateFin.getTime()) / oneDay));
    return parseFloat(String((diffDays + 1) * pricePerNight)).toFixed(2);
  }

  getReservationStatus(dateDebut: Date, dateFin: Date): string {
    const now = new Date();
    if (now < dateDebut) {
      return 'à venir';
    } else if (now > dateFin) {
      return 'passée';
    } else {
      return 'en cours';
    }
  }

  submitReview(rentalId: number): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent);

    dialogRef.afterClosed().subscribe(review => {
      if (review) {
        this.locationService.submitReview(rentalId, review).subscribe(() => {
          this.openSnackBar('Avis ajouté avec succès');
          // Mettre à jour la liste des locations après la soumission de l'avis
          this.ngOnInit();
        });
      }
    });
  }

  editReview(rentalId: number, existingReview: any): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: existingReview
    });

    dialogRef.afterClosed().subscribe(review => {
      if (review) {
        this.locationService.submitReview(rentalId, review).subscribe(() => {
          this.openSnackBar('Avis modifié avec succès');
          // Mettre à jour la liste des locations après la soumission de l'avis
          this.ngOnInit();
        });
      }
    });
  }

  openSnackBar(customText: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: customText // Transmettez le texte personnalisé ici
    });
  }

  imageClick(logement: Bien) {
    let navigationExtras: NavigationExtras = {
      state: {
        logement: logement
      }
    };
    console.log(logement);
    this.router.navigate(['/housingView'], navigationExtras);
  }

  protected readonly Date = Date;
}
