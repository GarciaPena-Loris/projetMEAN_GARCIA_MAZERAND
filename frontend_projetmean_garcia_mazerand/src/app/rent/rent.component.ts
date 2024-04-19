import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

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

  constructor(public dialogRef: MatDialogRef<RentComponent>) {}

  ngOnInit(): void {}

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

