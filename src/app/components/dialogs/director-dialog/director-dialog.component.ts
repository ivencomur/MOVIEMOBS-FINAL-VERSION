import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.Name || data.name }}</h2>
    <div mat-dialog-content>
      <p><strong>Biography:</strong></p>
      <p>{{ data.Bio || data.bio }}</p>
      <p *ngIf="data.Birth || data.birth"><strong>Born:</strong> {{ (data.Birth || data.birth) | date }}</p>
      <p *ngIf="data.Death || data.death"><strong>Died:</strong> {{ (data.Death || data.death) | date }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Close</button>
    </div>
  `
})
export class DirectorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}