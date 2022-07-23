import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

// Third-party
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

// Local
import { SprintFilter } from '../interfaces/sprint-filter';
import { environment } from 'src/environments/environment';
import { Sprint } from '../interfaces/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService implements OnDestroy {

  private _errors$: BehaviorSubject<any>;
  private _sprints$: BehaviorSubject<Sprint[]>;
  private _sprintsSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._errors$ = new BehaviorSubject(undefined);
    this._sprintsSubscription$ = new Subject<void>();
    this._sprints$ = new BehaviorSubject<Sprint[]>([]);
  }

  requestSprints(filter: SprintFilter): void {
    this._sprintsSubscription$.next();
    this._http.get<Sprint[]>(`${environment.apiEndpoint}/sprint/`).subscribe(
      {
        next: (value: Sprint[]) => this._sprints$.next(value),
        error: (error: HttpErrorResponse) => this._errors$.next(error),
      });
  }

  sprintsIsEmpty(): boolean {
    return !!(this._sprints$.value);
  }

  postSprint(obj: Sprint): Observable<any> {
    return this._http.post<Sprint>(`${environment.apiEndpoint}/sprint/`, obj)
  }

  patchSprint(id: number, obj: Sprint): Observable<any> {
    return this._http.patch<Sprint>(`${environment.apiEndpoint}/sprint/${id}/`, obj)
  }

  deleteSprint(id: number): Observable<any> {
    return this._http.delete(`${environment.apiEndpoint}/sprint/${id}/`);
  }

  getSprints(): Observable<Sprint[]> {
    return this._sprints$.asObservable();
  }

  getSprint(id: number): Observable<Sprint> {
    return this._http.get<Sprint>(`${environment.apiEndpoint}/sprint/${id}/`);
  }

  getRanking(sprintId: number): Observable<any> {
    return this._http.get(`${environment.apiEndpoint}/sprint/${sprintId}/ranking`).pipe(
      map((sprint: any) => {
        sprint.squads = sprint.squads.map((squad: any) => {
          let burndown: number = (squad.History.burdown || 0);
          let feedback: number = (squad.History.escapedDefects || 0);
          let escapedDefects: number = (squad.History.feedback || 0);

          squad.score = ((burndown / sprint.sprintConfiguration.burndownMax) + (feedback / sprint.sprintConfiguration.feedbackMax) + (escapedDefects / sprint.sprintConfiguration.escapedDefectsMax)) / 3;
          squad.score *= 100;
          squad.score = Math.round(squad.score);
          squad.scoreGoal = ((burndown / sprint.sprintConfiguration.burndownGoal) + (feedback / sprint.sprintConfiguration.feedbackGoal) + (escapedDefects / sprint.sprintConfiguration.escapedDefectsGoal)) / 3;
          squad.scoreGoal *= 100;
          squad.scoreGoal = Math.round(squad.scoreGoal);
          return squad;

        });

        sprint.squads.sort((a: any, b: any) => b.score - a.score);
        return sprint;
      })
    );
  }

  updateRanking(sprintId: number, squadId: number, obj: any): Observable<any> {
    return this._http.patch(`${environment.apiEndpoint}/ranking/${sprintId}/${squadId}`, obj);
  }

  getError(): Observable<any> {
    return this._errors$.asObservable();
  }

  ngOnDestroy(): void {
    this._sprintsSubscription$.next();
    this._sprintsSubscription$.complete();
  }
}
