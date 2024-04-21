import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel} from '@angular/material/snack-bar';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-pizza-party',
  standalone: true,
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction
  ],
  templateUrl: './snack-bar.component.html'
})
export class SnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public text: any) {
  }

  protected readonly console = console;
}
