import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable, Subject, takeUntil } from 'rxjs';

// Local
import { Sprint } from 'src/app/sprint/interfaces/sprint';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintService } from 'src/app/sprint/services/sprint.service';
import { SnackbarHandlerService } from 'src/app/utils/services/snackbar-handler.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit, OnDestroy {

  rippleColor!: string;
  sprints$!: Observable<Sprint[]>;

  private _destroyed$!: Subject<void>;
  private _snackbarSubscription$!: Subject<void>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _sprintService: SprintService,
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
      this._router.navigate(['settings', 'new', 'sprint']);
      return;
    }

    this._router.navigate(['settings', 'sprint', to]);
  }

  ngOnInit(): void {
    if (this._sprintService.sprintsIsEmpty()) {
      this._sprintService.requestSprints({});
    }

    this.sprints$ = this._sprintService.getSprints();
    this._sprintService.getError().pipe(
      takeUntil(this._destroyed$)
    ).subscribe(error => {
      if (error) {
        this._snackBarHandlerService.openSnackBar(this._snackbarSubscription$, 'Ooops! Houve um erro desconhecido');
      }
    });

  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this._snackbarSubscription$.next();
    this._snackbarSubscription$.complete();
  }

}
