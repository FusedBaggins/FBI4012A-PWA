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
      map((squads: any) => {
        squads.map((squad: any) => {
          let s: any = {
            name: squad.name,
            createdAt: squad.createdAt,
            
          };

          return squad;
        })
        return squads;
      })
    );
  }

  getError(): Observable<any> {
    return this._errors$.asObservable();
  }

  ngOnDestroy(): void {
    this._sprintsSubscription$.next();
    this._sprintsSubscription$.complete();
  }
}
