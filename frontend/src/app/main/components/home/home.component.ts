import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Third-party
import { Subject, takeUntil } from 'rxjs';

//Angular material
import { MatIconRegistry } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rippleColor!: string;
  actionsDirection: string;
  private _isDestroyed: Subject<void>;
  private _breakpoints: any[];

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _breakpointObserver: BreakpointObserver
  ) {
    this._breakpoints = [
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ];
    this._isDestroyed = new Subject();
    this.rippleColor = rippleColor;
    this.actionsDirection = 'column';

    this._sanitizeIcons();
    this._layoutChange();
  }

  private _layoutChange(): void {
    this._breakpointObserver.observe(this._breakpoints).pipe(
      takeUntil(this._isDestroyed)
    ).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._setActionsDirection(query);
        }
      }
    })
  }

  private _setActionsDirection(breakpoint: string): void {
    switch (breakpoint) {
      case Breakpoints.HandsetPortrait:
      case Breakpoints.HandsetLandscape:
        if (this.actionsDirection !== 'column') this.actionsDirection = 'column';
        break;
      default:
        if (this.actionsDirection !== 'row') this.actionsDirection = 'row';
        break
    }
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('insights', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/insights.svg'));
    this._iconRegistry.addSvgIcon('settings', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'));
  }

  onNavigate(to?: string): void {
    switch (to) {
      case 'sprint':
        this._router.navigate(['sprint']);
        break;
      case 'settings':
        this._router.navigate(['settings']);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
  }

}
