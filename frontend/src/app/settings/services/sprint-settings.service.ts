import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Third-party
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

// Local
import { environment } from 'src/environments/environment';
import { SprintSetting } from '../interfaces/sprint-setting';

@Injectable({
  providedIn: 'root'
})
export class SprintSettingsService implements OnDestroy {

  _sprintSettings$: BehaviorSubject<SprintSetting[]>;
  private _errors$: BehaviorSubject<any>;
  private _sprintSettingsSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._errors$ = new BehaviorSubject(undefined);
    this._sprintSettingsSubscription$ = new Subject();
    this._sprintSettings$ = new BehaviorSubject<SprintSetting[]>([]);
  }

  requestSprintSettings(): void {
    this._sprintSettingsSubscription$.next();
    this._http.get<SprintSetting[]>(`${environment.apiEndpoint}/sprint-configuration/`).pipe(
      takeUntil(this._sprintSettingsSubscription$)
    ).subscribe({
      next: (value: SprintSetting[]) => this._sprintSettings$.next(value),
      error: (error: HttpErrorResponse) => this._errors$.next(error),
    });
  }

  sprintSettingsIsEmpty(): boolean {
    return !!(this._sprintSettings$.value);
  }

  getErrors(): Observable<any> {
    return this._errors$.asObservable();
  }

  getSprintSetting(id: number): Observable<SprintSetting> {
    return this._http.get<SprintSetting>(`${environment.apiEndpoint}/sprint-configuration/${id}/`);
  }

  getSprintSettings(): Observable<SprintSetting[]> {
    return this._sprintSettings$.asObservable();
  }

  patchSprintSetting(id: number, obj: SprintSetting): Observable<any> {
    return this._http.patch<any>(`${environment.apiEndpoint}/sprint-configuration/${id}`, obj);
  }

  postSprintSetting(obj: SprintSetting): Observable<any> {
    return this._http.post<any>(`${environment.apiEndpoint}/sprint-configuration/`, obj);
  }

  deleteSprintSetting(id: number): Observable<any> {
    return this._http.delete<any>(`${environment.apiEndpoint}/sprint-configuration/${id}`);
  }

  ngOnDestroy(): void {
    this._sprintSettingsSubscription$.next();
    this._sprintSettingsSubscription$.complete();
  }
}
