import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { of, Subject, switchMap, takeUntil } from 'rxjs';

// Local
import { Squad } from 'src/app/settings/interfaces/squad';
import { SquadService } from 'src/app/squad/services/squad.service';
import { ConfirmationDialog } from 'src/app/utils/interfaces/confirmation-dialog';
import { SnackbarHandlerService } from 'src/app/utils/services/snackbar-handler.service';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-squad-detail',
  templateUrl: './squad-detail.component.html',
  styleUrls: ['./squad-detail.component.scss']
})
export class SquadDetailComponent implements OnInit, OnDestroy {

  icon: string;
  form: FormGroup;
  update!: boolean;

  private _isDestroyed$: Subject<void>;
  private _dialogSubscription$: Subject<void>;
  private _snackBarSubscrition$: Subject<void>;
  private _createOrUpdateSubscription$: Subject<void>;

  constructor(
    private _dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _squadService: SquadService,
    private _iconRegistry: MatIconRegistry,
    private _activatedRoute: ActivatedRoute,
    private _snackBarHandlerService: SnackbarHandlerService
  ) {
    this.form = this._formBuilder.group({
      id: [],
      name: [null, [Validators.required]],
    });

    this.icon = 'add';
    this._sanitizeIcons();
    this._isDestroyed$ = new Subject();
    this._dialogSubscription$ = new Subject();
    this._snackBarSubscrition$ = new Subject();
    this._createOrUpdateSubscription$ = new Subject();

  }
  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    this._iconRegistry.addSvgIcon('edit', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
  }

  private _onRequestError(error: HttpErrorResponse): void {
    let message: string;
    message = (error.status === 404) ? 'Oops! Squad não encontrado' : 'Ooops! Houve um erro desconhecido';

    this._snackBarHandlerService.openSnackBar(
      this._snackBarSubscrition$,
      message,
      'OK',
      ['settings', 'new', 'squad']
    );
  }

  private _onRequestSuccess(message: string, navigateTo?: string[]): void {
    this._snackBarHandlerService.openSnackBar(
      this._snackBarSubscrition$,
      message,
      'ok',
      navigateTo
    );
  }

  onDelete(): void {
    const dialogData: ConfirmationDialog = {
      title: 'Remover',
      description: `Você deseja excluir "${this.form.get('name')?.value}"?`,
    }

    this._dialogSubscription$.next();
    const dialog = this._dialog.open(ConfirmationDialogComponent, { data: dialogData, width: '80%' });
    dialog.afterClosed().pipe(
      takeUntil(this._dialogSubscription$),
      switchMap(value => {
        if (value) {
          const id: number = this.form.get('id')?.value;
          return this._squadService.deleteSquad(id);
        }
        return of();
      })
    ).subscribe({
      next: () => {
        this._onRequestSuccess('Squad removido', ['settings', 'squad']);
      },
      error: (error: HttpErrorResponse) => this._onRequestError(error)
    });
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
        next: () => {
          let message: string;
          message = (update) ? 'Sprint atualizada' : 'Sprint adicionada';

          this._onRequestSuccess(message);
          if (update) return;
          this.form.reset();
        },
        error: (error: HttpErrorResponse) => this._onRequestError(error)
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
          this.update = true;
          this.form.patchValue(value);
          return;
        }

        this.update = false;

      },
      error: (error: HttpErrorResponse) => this._onRequestError(error)
    });
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
    this._dialogSubscription$.next();
    this._dialogSubscription$.complete();
    this._snackBarSubscrition$.next();
    this._snackBarSubscrition$.complete();
    this._createOrUpdateSubscription$.next();
    this._createOrUpdateSubscription$.complete();
  }
}
