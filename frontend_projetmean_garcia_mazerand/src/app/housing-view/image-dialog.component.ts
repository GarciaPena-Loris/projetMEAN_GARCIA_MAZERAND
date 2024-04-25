import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  template: `
    <div class="image-dialog">
      <img [src]="data.url" alt="Image" class="image" (click)="closeDialog()">
    </div>
  `,
  styles: [`
    .image-dialog {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90vh;
    }
    .image {
      max-height: 100%;
      width: auto;
      cursor: pointer;
    }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }, private dialogRef: MatDialogRef<ImageDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
