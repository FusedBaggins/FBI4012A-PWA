import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

// Third-party
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// Local
import { SprintFilter } from '../interfaces/sprint-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintService implements OnDestroy {

  private _errors$: BehaviorSubject<any>;
  private _sprints$: BehaviorSubject<any>;
  private _sprintsSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._errors$ = new BehaviorSubject(undefined);
    this._sprints$ = new BehaviorSubject([]);
    this._sprintsSubscription$ = new Subject<void>();
  }

  requestSprints(filter: SprintFilter): void {
    this._sprintsSubscription$.next();
    this._http.get(`${environment.apiEndpoint}/sprint/`).subscribe(
      (sprints) => {
        this._sprints$.next(sprints);
      },
      (error: HttpErrorResponse) => {
        this._errors$.next(error)
      });
  }

  getSprints(): Observable<any> {
    return this._sprints$.asObservable();
  }

  getError(): Observable<any> {
    return this._errors$.asObservable();
  }

  ngOnDestroy(): void {
    this._sprintsSubscription$.next();
    this._sprintsSubscription$.complete();
  }
}
