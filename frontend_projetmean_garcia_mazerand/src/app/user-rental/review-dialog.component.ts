// review-dialog.component.ts
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-review-dialog',
  template: `
    <form (ngSubmit)="submit()" class="form-container">
      <div class="containeur">
        <h1>Noter la location</h1>
        <mat-form-field>
          <mat-label>Note</mat-label>
          <input matInput [(ngModel)]="review.note" name="rating" type="number" min="1" max="5" required>
          <mat-icon matSuffix>star</mat-icon>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Commentaire</mat-label>
          <textarea matInput [(ngModel)]="review.commentaire" name="comment"></textarea>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="review.note == ''">Soumettre</button>
      </div>
    </form>
  `,
  styles: [`
    .form-container {
      width: 30vw;
    }

    .containeur {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10%;
    }

    mat-form-field {
      width: 100%;
      max-width: 400px;
      margin: 10px;
    }

    button {
      margin-top: 20px;
    }
  `]
})
export class ReviewDialogComponent {
  review = {note: '', commentaire: ''};

  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.review = data;
    }
  }

  submit(): void {
    this.dialogRef.close(this.review);
  }
}
