import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Third-party
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

// Local
import { Squad } from 'src/app/settings/interfaces/squad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SquadService implements OnDestroy {

  private _errors$: BehaviorSubject<any>;
  private _squads$: BehaviorSubject<Squad[]>;
  private _squadsSubscription$: Subject<void>;

  constructor(private _http: HttpClient) {
    this._squadsSubscription$ = new Subject();
    this._errors$ = new BehaviorSubject(undefined);
    this._squads$ = new BehaviorSubject<Squad[]>([]);
   }

   squadsIsEmpty(): boolean {
    return !!(this._squads$.value);
  }

  requestSquad(): void {
    this._squadsSubscription$.next();
    this._http.get<Squad[]>(`${environment.apiEndpoint}/squad/`).pipe(
      takeUntil(this._squadsSubscription$)
    ).subscribe({
      next: (value: Squad[]) => this._squads$.next(value),
      error: (error: HttpErrorResponse) => this._errors$.next(error),
    });
  }

  getErrors(): Observable<any> {
    return this._errors$.asObservable();
  }

  getSquads():Observable<Squad[]>{
    return this._squads$.asObservable();
  }

  getSquad(id: number): Observable<Squad> {
    return this._http.get<Squad>(`${environment.apiEndpoint}/squad/${id}`);
  }

  postSquad(obj: any): Observable<any> {
    return this._http.post<any>(`${environment.apiEndpoint}/squad`, obj);
  }

  patchSquad(id: number, obj: any): Observable<any> {
    return this._http.patch(`${environment.apiEndpoint}/squad/${id}`, obj);
  }

  ngOnDestroy(): void {
    this._squadsSubscription$.next();
    this._squadsSubscription$.complete();
  }
}
