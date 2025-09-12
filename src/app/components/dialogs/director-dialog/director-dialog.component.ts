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
    <h2 mat-dialog-title>{{ getDirectorName() }}</h2>
    <div mat-dialog-content>
      <p><strong>Biography:</strong></p>
      <p>{{ getDirectorBio() }}</p>
      <p *ngIf="getBirthDate()"><strong>Born:</strong> {{ getBirthDate() | date }}</p>
      <p *ngIf="getDeathDate()"><strong>Died:</strong> {{ getDeathDate() | date }}</p>
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

  getDirectorName(): string {
    if (!this.data) return 'Unknown Director';
    return this.data.Name || this.data.name || 'Unknown Director';
  }

  getDirectorBio(): string {
    if (!this.data) return 'No biography available.';
    return this.data.Bio || this.data.bio || 'No biography available.';
  }

  getBirthDate(): Date | null {
    if (!this.data) return null;
    return this.data.Birth || this.data.birth || null;
  }

  getDeathDate(): Date | null {
    if (!this.data) return null;
    return this.data.Death || this.data.death || null;
  }
}