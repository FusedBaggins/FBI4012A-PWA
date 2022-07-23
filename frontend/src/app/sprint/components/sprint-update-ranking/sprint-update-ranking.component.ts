import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { debounce, debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-sprint-update-ranking',
  templateUrl: './sprint-update-ranking.component.html',
  styleUrls: ['./sprint-update-ranking.component.scss']
})
export class SprintUpdateRankingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private _destroyed$: Subject<void>;

  constructor(
    private _sprintService: SprintService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {

    this._destroyed$ = new Subject();

    this.form = this._formBuilder.group({
      burndown: [null, [Validators.max(this.data.sprintConfiguration.burndownMax)]],
      escapedDefects: [null, [Validators.max(this.data.sprintConfiguration.escapedDefectsMax)]],
      feedback: [null, [Validators.max(this.data.sprintConfiguration.feedbackMax)]]
    });

    this.form.patchValue(data.history, { emitEvent: false });
  }

  ngOnInit(): void {

    this.form.valueChanges.pipe(
      takeUntil(this._destroyed$),
      debounceTime(500),
      switchMap(values => {
        if (this.form.valid) {
          let update: boolean = false;

          if (values.burndown !== this.data.burndown) update = true;
          if (values.escapedDefects !== this.data.escapedDefects) update = true;
          if (values.feedback !== this.data.feedback) update = true;

          if (update) return this._sprintService.updateRanking(this.data.history.sprintId, this.data.history.squadId, values);
          return of(undefined);
        }

        return of(undefined);
      })
    ).subscribe(value => {

    })

  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
