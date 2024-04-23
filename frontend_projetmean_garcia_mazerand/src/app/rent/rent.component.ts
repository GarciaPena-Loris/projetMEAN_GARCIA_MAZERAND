import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../auth-card/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.css'
})
export class RentComponent implements OnInit {
  // Propriétés pour stocker les données saisies par l'utilisateur
  dateArrivee: Date | null = null;
  dateDepart: Date | null = null;
  nombreVoyageurs: number | null = null;
  nom: string | null = null;
  prenom: string | null = null;
  code: number | null = null;
  expiration: Date | null = null;
  cvv: number | null = null;

  constructor(public dialogRef: MatDialogRef<RentComponent>, protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    // Redirection vers la page après la connexion
    this.dialogRef.close();
    this.router.navigate(['/auth']);
  }

  // Méthode appelée lorsque l'utilisateur confirme la location
  confirmerLocation(): void {
    // Vous pouvez traiter les données saisies ici (par exemple, envoyer à un service)
    console.log('Date d\'arrivée :', this.dateArrivee);
    console.log('Date de départ :', this.dateDepart);
    console.log('Nombre de voyageurs :', this.nombreVoyageurs);

    // Fermer le popup
    this.dialogRef.close();
  }

  annulerLocation(): void {
    // Fermer le popup sans rien faire
    this.dialogRef.close();
  }
}

