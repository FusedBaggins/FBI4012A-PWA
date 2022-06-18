import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//Angular Material
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() subtitle!: string;

  rippleColor!: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
  ) {
    this._sanitizeIcons();
    this.rippleColor = this.rippleColor;
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('arrow_back', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_back.svg'));
  }

  onGoBack(): void {
    history.back();
  }

  ngOnInit(): void {
  }

}
