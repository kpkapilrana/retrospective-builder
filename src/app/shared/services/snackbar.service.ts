import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  open(message) {
    this.snackbar.open(message, '', {
      duration: 3000
    });
  }
}
