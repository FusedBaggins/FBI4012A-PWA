import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable, Subject, takeUntil } from 'rxjs';

// Local
import { Squad } from 'src/app/settings/interfaces/squad';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SquadService } from 'src/app/squad/services/squad.service';
import { SnackbarHandlerService } from 'src/app/utils/services/snackbar-handler.service';


@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.scss']
})
export class SquadListComponent implements OnInit, OnDestroy {

  rippleColor: string;
  squads$!: Observable<Squad[]>;

  private _destroyed$: Subject<void>;
  private _snackbarSubscription$: Subject<void>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _squadService: SquadService,
    private _iconRegistry: MatIconRegistry,
    private _snackBarHandlerService: SnackbarHandlerService

  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;

    this._destroyed$ = new Subject();
    this._snackbarSubscription$ = new Subject();
  }


  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  onNavigate(to: number): void {
    if (to === -1) {
      this._router.navigate(['settings', 'new', 'squad']);
      return;
    }

    this._router.navigate(['settings', 'squad', to]);
  }

  ngOnInit(): void {
    if (this._squadService.squadsIsEmpty()) this._squadService.requestSquad();

    this.squads$ = this._squadService.getSquads();

    this._squadService.getErrors().pipe(
      takeUntil(this._destroyed$)
    ).subscribe(error => {
      if (error) {
        this._snackBarHandlerService.openSnackBar(this._snackbarSubscription$, 'Ooops! Houve um erro desconhecido');
      }
    })
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this._snackbarSubscription$.next();
    this._snackbarSubscription$.complete();
  }

}
