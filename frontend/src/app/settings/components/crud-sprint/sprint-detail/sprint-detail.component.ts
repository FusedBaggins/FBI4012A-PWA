import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Local
import { SprintSettingsService } from 'src/app/settings/services/sprint-settings.service';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { SprintSetting } from 'src/app/settings/interfaces/sprint-setting';
import { SquadService } from 'src/app/squad/services/squad.service';
import { Squad } from 'src/app/settings/interfaces/squad';

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss']
})
export class SprintDetailComponent implements OnInit {

  icon: string;
  form: FormGroup;
  squads$!: Observable<Squad[]>;
  sprintSettings$!: Observable<SprintSetting[]>;

  private _isDestroyed$: Subject<void>;
  private _createOrUpdateSubscription$: Subject<void>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private _squadService: SquadService,
    private _iconRegistry: MatIconRegistry,
    private _activatedRoute: ActivatedRoute,
    private _sprintSettingsService: SprintSettingsService
  ) {

    this.form = this._formBuilder.group({
      id: [],
      name: [null, [Validators.required]],
      setting: [null, [Validators.required]],
      status: [null, [Validators.required]],
      startDate: [undefined, []],
      endDate: [undefined, []],
      squads: [null, [Validators.required]],
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
    //   if (this.form.valid) {
    //     let obj: Sprint = this.form.value;
    //     let update: boolean;

    //     update = !!(obj.id);

    //     of(undefined).pipe(
    //       takeUntil(
    //         this._createOrUpdateSubscription$
    //       ),
    //       switchMap(() => {

    //         if (update) return this._sprintSettingsService.patchSprintSetting(obj.id, obj);
    //         return this._sprintSettingsService.postSprintSetting(obj);
    //       })
    //     ).subscribe({
    //       next: (value) => {
    //         if (update) return;
    //         this._router.navigate(['settings','sprint-settings', value.id]);
    //       },
    //       error: (error: HttpErrorResponse) => { }
    //     });
    //   }
  }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      takeUntil(this._isDestroyed$),
      switchMap((params: any) => {
        if (params.id) return this._sprintSettingsService.getSprintSetting(params.id);
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

    if (this._squadService.squadsIsEmpty()) this._squadService.requestSquad();
    if (this._sprintSettingsService.sprintSettingsIsEmpty()) this._sprintSettingsService.requestSprintSettings();

    this.squads$ = this._squadService.getSquads();
    this.sprintSettings$ = this._sprintSettingsService.getSprintSettings();
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
    this._createOrUpdateSubscription$.next();
    this._createOrUpdateSubscription$.complete();
  }

}
