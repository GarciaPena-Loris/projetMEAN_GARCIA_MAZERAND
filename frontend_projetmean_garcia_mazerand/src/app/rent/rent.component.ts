import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../auth-card/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "../model/location.interface";
import {LocationService} from "../services/locationService";
import {Bien} from "../model/bien.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../auth-card/snackBar.component";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {
  locationForm = this.fb.group({
    dateArrivee: ['', Validators.required],
    dateDepart: ['', Validators.required],
    nombreVoyageurs: ['', Validators.required],
    nom: ['', Validators.required],
    code: ['', Validators.required],
    expiration: ['', Validators.required],
    ccv: ['', Validators.required]
  }, {validators: this.dateLessThan('dateArrivee', 'dateDepart')});

  nombrePersonneMax = 1;
  minDate: Date = new Date();
  reservations: { dateDebut: Date, dateFin: Date }[] = [];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RentComponent>, protected authService: AuthService, private router: Router, private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: Bien, private _snackBar: MatSnackBar) {
    this.nombrePersonneMax = data.nbCouchages;
  }

  ngOnInit() {
    this.locationForm.controls['dateDepart'].disable();
    this.locationService.getReservations(this.data.idBien).subscribe(reservations => {
      console.log("Reservations:", reservations);
      this.reservations = reservations.map(reservation => ({
        dateDebut: new Date(reservation.dateDebut),
        dateFin: new Date(reservation.dateFin)
      }));
    });

    // Activer 'dateDepart' lorsque 'dateArrivee' a une valeur
    this.locationForm.controls['dateArrivee'].valueChanges.subscribe(value => {
      if (value) {
        this.locationForm.controls['dateDepart'].enable();
      } else {
        this.locationForm.controls['dateDepart'].disable();
      }
    });
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "La date de départ doit être après la date d'arrivée"
        };
      }
      return {};
    }
  }

  isArrivalReserved(date: Date | null): boolean {
    if (!date || !this.reservations) {
      return false;
    }

    return !this.reservations.some(reservation =>
      date >= reservation.dateDebut && date <= reservation.dateFin
    );
  }

  reservedArrivalDate = this.isArrivalReserved.bind(this);

  isDepartureReserved(date: Date | null): boolean {
    if (!date || !this.reservations || !this.locationForm.controls['dateArrivee'].value) {
      return false;
    }

    // Convertir la date sélectionnée en timestamp pour faciliter la comparaison
    const selectedDateTimestamp = date.getTime();
    const arrivalDateTimestamp = new Date(this.locationForm.controls['dateArrivee'].value).getTime();

    // Trouver la prochaine réservation après la date d'arrivée
    const nextReservation = this.reservations.find(reservation =>
      new Date(reservation.dateDebut).getTime() > arrivalDateTimestamp
    );

    return !this.reservations.some(reservation => {
      const reservationStartTimestamp = new Date(reservation.dateDebut).getTime();
      const reservationEndTimestamp = new Date(reservation.dateFin).getTime();

      // La date est réservée si elle est dans l'intervalle de réservation
      const isWithinReservation = selectedDateTimestamp >= reservationStartTimestamp && selectedDateTimestamp <= reservationEndTimestamp;

      // La date est réservée si elle est antérieure à la date d'arrivée
      const isBeforeArrivalDate = selectedDateTimestamp <= arrivalDateTimestamp;

      // La date est réservée si elle est postérieure à la prochaine réservation après la date d'arrivée
      const isAfterNextReservation = nextReservation && selectedDateTimestamp > new Date(nextReservation.dateDebut).getTime();

      return isWithinReservation || isBeforeArrivalDate || isAfterNextReservation;
    });
  }

  reservedDepartureDate = this.isDepartureReserved.bind(this);

  login() {
    // Redirection vers la page après la connexion
    this.dialogRef.close();
    this.router.navigate(['/auth']);
  }

  // Méthode appelée lorsque l'utilisateur confirme la location
  onSubmitLocation(): void {
    // Convertir les dates en timestamp
    const dateDebutValue = this.locationForm.value.dateArrivee;
    const dateFinValue = this.locationForm.value.dateDepart;

    const dateDebutTimestamp = dateDebutValue ? new Date(dateDebutValue).getTime() : new Date().getTime();
    const dateFinTimestamp = dateFinValue ? new Date(dateFinValue).getTime() : new Date().getTime();

    console.log("Date de début:", dateDebutTimestamp);
    console.log("Date de fin:", dateFinTimestamp);

    // Créer une nouvelle location
    const location: Location = {
      idLocation: 0,
      idBien: this.data.idBien,
      mailLoueur: this.authService.currentUserInfo.mail,
      dateDebut: dateDebutTimestamp,
      dateFin: dateFinTimestamp,
      avis: []
    }

    // Enregistrer la location
    this.locationService.newLocation(location).subscribe(() => {
      this.openSnackBar("Location enregistrée avec succès");
      this.dialogRef.close();
      this.router.navigate(['/user-rentals']);
    }, error => {
      // Affiche un message d'erreur
      console.error(error);
    });
  }

  openSnackBar(customText: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: customText
    });
  }

  annulerLocation(): void {
    // Fermer le popup sans rien faire
    this.dialogRef.close();
  }
}

