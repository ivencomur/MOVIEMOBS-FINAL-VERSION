import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.Title }}</h2>
    <div mat-dialog-content>
      <p><strong>Synopsis:</strong></p>
      <p>{{ data.Description }}</p>
      <div class="movie-details">
        <p><strong>Genre:</strong> {{ data.Genre?.name }}</p>
        <p><strong>Director:</strong> {{ data.Director?.name }}</p>
        <p *ngIf="data.ReleaseYear"><strong>Year:</strong> {{ data.ReleaseYear }}</p>
        <p *ngIf="data.Rating"><strong>Rating:</strong> {{ data.Rating }}/10</p>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Close</button>
    </div>
  `,
  styles: [`
    .movie-details {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }
  `]
})
export class SynopsisDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
