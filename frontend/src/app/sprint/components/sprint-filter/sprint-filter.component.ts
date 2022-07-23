import { FormGroup } from '@angular/forms';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';

// Angular Material
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

// Third-party
import { Subject, takeUntil } from 'rxjs';
import { SprintFilter } from '../../interfaces/sprint-filter';

@Component({
  selector: 'app-sprint-filter',
  templateUrl: './sprint-filter.component.html',
  styleUrls: ['./sprint-filter.component.scss']
})
export class SprintFilterComponent implements OnInit, OnDestroy {

  @Input() form!: FormGroup;
  statuses: string[];

  private _isDestroyed$: Subject<void>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { form: FormGroup }
  ) {
    if (data.form) this.form = data.form;
    this._isDestroyed$ = new Subject<void>();
    this.statuses = ['Não iniciada', 'Em andamento', 'Encerrada'];
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this._isDestroyed$)
    ).subscribe((filter: SprintFilter) => {
    });
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
  }

}
