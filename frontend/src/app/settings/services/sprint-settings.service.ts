import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Third-party
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

// Local
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintSettingsService implements OnDestroy {

  sprintSettings$: BehaviorSubject<any>;
  private _errors$: BehaviorSubject<any>;
  private _sprintSettingsSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._errors$ = new BehaviorSubject(undefined);
    this._sprintSettingsSubscription$ = new Subject();
    this.sprintSettings$ = new BehaviorSubject(undefined);
  }

  requestSprintSettings(): void {
    this._sprintSettingsSubscription$.next();
    this._http.get(`${environment.apiEndpoint}/sprint-settings`).pipe(
      takeUntil(this._sprintSettingsSubscription$)
    ).subscribe({
      next: (value: any) => this.sprintSettings$.next(value),
      error: (error: HttpErrorResponse) => this._errors$.next(error),
    });
  }

  getErrors(): Observable<any> {
    return this._errors$.asObservable();
  }

  getSprintSettings(): Observable<any> {
    return this.sprintSettings$.asObservable();
  }

  ngOnDestroy(): void {
    this._sprintSettingsSubscription$.next();
    this._sprintSettingsSubscription$.complete();
  }
}
