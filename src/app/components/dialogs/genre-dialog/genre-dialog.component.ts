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
    <h2 mat-dialog-title>{{ getGenreName() }}</h2>
    <div mat-dialog-content>
      <p>{{ getGenreDescription() }}</p>
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

  getGenreName(): string {
    if (!this.data) return 'Unknown Genre';
    return this.data.Name || this.data.name || 'Unknown Genre';
  }

  getGenreDescription(): string {
    if (!this.data) return 'No description available.';
    return this.data.Description || this.data.description || 'No description available.';
  }
}