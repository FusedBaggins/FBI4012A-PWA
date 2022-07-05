import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//Angular Material
import { MatIconRegistry } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() subtitle!: string;

  layout!: 'mobile' | 'desktop';
  rippleColor!: string;

  private _breakpoints: any[];
  private _destroyed$: Subject<void>;

  constructor(
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _breakpointObserver: BreakpointObserver

  ) {
    this._breakpoints = [
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ];
    this.layout = 'mobile';
    this._destroyed$ = new Subject();

    this._layoutChange();
    this._sanitizeIcons();
    this.rippleColor = this.rippleColor;
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('arrow_back', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_back.svg'));
  }

  private _setLayout(breakpoint: string): void {
    switch (breakpoint) {
      case Breakpoints.HandsetPortrait:
      case Breakpoints.TabletPortrait:
        if (this.layout === 'desktop') this.layout = 'mobile';
        break;
      case Breakpoints.HandsetLandscape:
      case Breakpoints.TabletLandscape:
      case Breakpoints.WebPortrait:
        case Breakpoints.WebLandscape:
        if (this.layout === 'mobile') this.layout = 'desktop';
        break;
    }
  }

  private _layoutChange(): void {
    this._breakpointObserver.observe(this._breakpoints).pipe(
      takeUntil(this._destroyed$)
    ).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this._setLayout(query);
        }
      }
    })
  }

  onGoBack(): void {
    history.back();
  }

  ngOnInit(): void {
  }

}
