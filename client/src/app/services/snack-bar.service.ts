import { Injectable } from '@angular/core';
import {MatSnackBar,  MatSnackBarRef} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackbar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.openSnackbar(message, 'success');
  }

  showError(message: string): void {
    this.openSnackbar(message, 'error');
  }

  showWarning(message: string): void {
    this.openSnackbar(message, 'warning');
  }

  private openSnackbar(message: string, panelClass: string): MatSnackBarRef<any> {
    return this.snackbar.open(message, 'Close', {
      duration: 30000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: panelClass
    });
  }
}
