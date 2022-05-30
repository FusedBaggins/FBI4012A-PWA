import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { rippleColor } from 'src/app/utils/constants/ripple-color';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {

  rippleColor: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('search', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
  }

  ngOnInit(): void {
  }

}
