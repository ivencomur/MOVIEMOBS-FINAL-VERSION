import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>
    <div mat-dialog-content>
      <p>{{ data.description }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Close</button>
    </div>
  `
})
export class GenreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
