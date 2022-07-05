import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

// Angular Material

import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

// Third-party
import { Observable, Subject, takeUntil } from 'rxjs';


// Local
import { SprintService } from '../../services/sprint.service';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintFilterComponent } from '../sprint-filter/sprint-filter.component';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit, OnDestroy {

  form: FormGroup;
  rippleColor: string;

  errors$!: Observable<any>;
  sprints$!: Observable<any>;
  private _isDestroyed$: Subject<void>;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private _sprintService: SprintService,
    private _iconRegistry: MatIconRegistry,
  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;

    this.form = this._formBuilder.group({
      name: [undefined, []],
      startDate: [undefined, []],
      endDate: [undefined, []],
      status: [undefined, []]
    });

    this._isDestroyed$ = new Subject<void>();
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('search', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
  }

  onFilter(): void {
    this._bottomSheet.open(SprintFilterComponent, { panelClass: ['custom-bottom-sheet-container'], data: { form: this.form } });
  }

  onNavigate(to: number): void {
    this._router.navigate(['sprint', to])
  }

  ngOnInit(): void {
    this._sprintService.requestSprints({});
    this.sprints$ = this._sprintService.getSprints();

    this._sprintService.getError().pipe(
      takeUntil(this._isDestroyed$)
    ).subscribe(error => {
      if (error) {
        this._snackBar.open(error.message)
      }
    })
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
  }

}
