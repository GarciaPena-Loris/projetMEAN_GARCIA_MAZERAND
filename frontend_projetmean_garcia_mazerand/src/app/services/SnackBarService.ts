import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from "../auth-card/SnackBarComponent";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, customText: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: customText // Transmettez le texte personnalisé ici
    });
  }
}
