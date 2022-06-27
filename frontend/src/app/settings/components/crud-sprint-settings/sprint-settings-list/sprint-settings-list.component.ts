import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable, Subject, takeUntil } from 'rxjs';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintSetting } from 'src/app/settings/interfaces/sprint-setting';
import { SnackbarHandlerService } from 'src/app/utils/services/snackbar-handler.service';
import { SprintSettingsService } from 'src/app/settings/services/sprint-settings.service';


@Component({
  selector: 'app-sprint-settings-list',
  templateUrl: './sprint-settings-list.component.html',
  styleUrls: ['./sprint-settings-list.component.scss']
})
export class SprintSettingsListComponent implements OnInit, OnDestroy {

  rippleColor: string;
  sprintSettings$!: Observable<SprintSetting[]>;

  private _destroyed$: Subject<void>;
  private _snackBarSubscription$: Subject<void>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _sprintSettingsService: SprintSettingsService,
    private _snackBarHandlerService: SnackbarHandlerService
  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;

    this._destroyed$ = new Subject();
    this._snackBarSubscription$ = new Subject();
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  onNavigate(to: number) {
    if (to === -1) {
      this._router.navigate(['settings', 'new', 'sprint-settings']);
      return;
    }
    this._router.navigate(['settings', 'sprint-settings', to]);
  }

  ngOnInit(): void {
    this._sprintSettingsService.requestSprintSettings();
    this.sprintSettings$ = this._sprintSettingsService.getSprintSettings();

    this._sprintSettingsService.getErrors().pipe(
      takeUntil(this._destroyed$)
    ).subscribe({
      next: (error: HttpErrorResponse) => {
        if (error) {
          this._snackBarHandlerService.openSnackBar(this._snackBarSubscription$, 'Ooops! Houve um erro desconhecido');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this._snackBarSubscription$.next();
    this._snackBarSubscription$.complete();
  }
}
