import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-sprint-detail',
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss']
})
export class SprintDetailComponent implements OnInit {

  squads$!: Observable<any>;

  rippleColor: string;

  constructor(
    private _router: Router,
    private _sprintService: SprintService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.rippleColor = rippleColor;
  }

  ngOnInit(): void {
    this.squads$ = this._activatedRoute.params.pipe(
      switchMap((params: any) => this._sprintService.getRanking(params.id)),
      tap(v => console.log(v)
      )
    );
  }

}
