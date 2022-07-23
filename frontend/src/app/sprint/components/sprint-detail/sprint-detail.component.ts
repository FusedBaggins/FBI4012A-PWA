import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintService } from '../../services/sprint.service';
import { SprintUpdateRankingComponent } from '../sprint-update-ranking/sprint-update-ranking.component';

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss']
})
export class SprintDetailComponent implements OnInit, OnDestroy {

  rippleColor: string;
  sprint$!: Observable<any>;

  private _bottomSheetSubscription$!: Subject<void>;

  constructor(
    private _router: Router,
    private _sprintService: SprintService,
    private _activatedRoute: ActivatedRoute,
    private _matBottomSheet: MatBottomSheet,
  ) {
    this.rippleColor = rippleColor;
    this._bottomSheetSubscription$ = new Subject();
  }

  onUpdateRanking(squad: any, sprintConfiguration: any): void {
    const bottonSheet = this._matBottomSheet.open(SprintUpdateRankingComponent, { panelClass: ['custom-bottom-sheet-container'], data: { history: squad.History, sprintConfiguration: sprintConfiguration } });
    this.sprint$ = bottonSheet.afterDismissed().pipe(
      takeUntil(this._bottomSheetSubscription$),
      switchMap(() => this._activatedRoute.params),
      switchMap((params: any) => this._sprintService.getRanking(params.id)),
      tap(() => this._bottomSheetSubscription$.next())
    );
  }

  ngOnInit(): void {
    this.sprint$ = this._activatedRoute.params.pipe(
      switchMap((params: any) => this._sprintService.getRanking(params.id))
    );
  }

  ngOnDestroy(): void {
    this._bottomSheetSubscription$.next();
    this._bottomSheetSubscription$.complete();
  }

}
