import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Squad } from 'src/app/settings/interfaces/squad';
import { SquadService } from 'src/app/squad/services/squad.service';

@Component({
  selector: 'app-squad-detail',
  templateUrl: './squad-detail.component.html',
  styleUrls: ['./squad-detail.component.scss']
})
export class SquadDetailComponent implements OnInit, OnDestroy {

  icon: string;
  form: FormGroup;

  private _isDestroyed$: Subject<void>;
  private _createOrUpdateSubscription$: Subject<void>;

  constructor(private _router: Router,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _squadService: SquadService,
    private _iconRegistry: MatIconRegistry,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.form = this._formBuilder.group({
      id: [],
      name: [null, [Validators.required]],
    });

    this.icon = 'add';
    this._sanitizeIcons();
    this._isDestroyed$ = new Subject();
    this._createOrUpdateSubscription$ = new Subject();

  }
  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    this._iconRegistry.addSvgIcon('edit', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
  }

  onSubmit(): void {

    if (this.form.valid) {
      let obj: Squad = this.form.value;
      let update: boolean;

      update = !!(obj.id);

      of(undefined).pipe(
        takeUntil(
          this._createOrUpdateSubscription$
        ),
        switchMap(() => {
          if (update) return this._squadService.patchSquad(obj.id, obj);
          return this._squadService.postSquad(obj);
        })
      ).subscribe({
        next: (value) => {
          if (update) return;
          this._router.navigate(['settings', 'squad', value.id]);
        },
        error: (error: HttpErrorResponse) => { }
      });
    }
  }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      takeUntil(this._isDestroyed$),
      switchMap((params: any) => {
        if (params.id) return this._squadService.getSquad(params.id);
        return of();
      })
    ).subscribe({
      next: (value) => {
        if (value) {
          this.icon = 'edit';
          this.form.patchValue(value);
        }
      },
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
    this._createOrUpdateSubscription$.next();
    this._createOrUpdateSubscription$.complete();
  }
}
