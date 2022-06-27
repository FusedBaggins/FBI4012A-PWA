import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Angular material
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// Third-party
import { delay, Subject, takeUntil } from 'rxjs';

// Local
import { snackbarDuration } from '../constants/snackbar-duration';

@Injectable({
  providedIn: 'root'
})
export class SnackbarHandlerService {

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(subscription$: Subject<void>, message: string, action: string = 'OK', navigateTo?: string[]): void {
    let snackbar;
    let config: MatSnackBarConfig = { duration: snackbarDuration };

    subscription$.next();
    snackbar = this._snackBar.open(message, action, config);
  
    snackbar.afterDismissed().pipe(
      delay(100),
      takeUntil(subscription$)
    ).subscribe(() => {
      if (navigateTo) {
        this._router.navigate(navigateTo);
      }
    });
  }
}
