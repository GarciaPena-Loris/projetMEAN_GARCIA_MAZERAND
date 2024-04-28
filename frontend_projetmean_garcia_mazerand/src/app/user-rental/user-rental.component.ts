// user-rentals.component.ts
import { Component, OnInit } from '@angular/core';
import {RentalsService} from "../services/user-rentalService";
import {AuthService} from "../auth-card/auth.service";

@Component({
  selector: 'app-user-rental',
  templateUrl: './user-rental.component.html',
  styleUrls: ['./user-rental.component.css']
})
export class UserRentalComponent implements OnInit {
  rentals: any[] = [];

  constructor(private rentalsService: RentalsService, private authService: AuthService) { }

  ngOnInit(): void {
    const userEmail = this.authService.currentUserInfo.mail;
    this.rentalsService.getUserRentals(userEmail).subscribe(rentals => {
      this.rentals = rentals;
    });
  }

  submitReview(rentalId: string, review: string): void {
    this.rentalsService.submitReview(rentalId, review).subscribe(() => {
      // Mettre à jour la liste des locations après la soumission de l'avis
      this.ngOnInit();
    });
  }
}
