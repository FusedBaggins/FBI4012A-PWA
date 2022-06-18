import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable } from 'rxjs';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintSetting } from 'src/app/settings/interfaces/sprint-setting';
import { SprintSettingsService } from 'src/app/settings/services/sprint-settings.service';


@Component({
  selector: 'app-sprint-settings-list',
  templateUrl: './sprint-settings-list.component.html',
  styleUrls: ['./sprint-settings-list.component.scss']
})
export class SprintSettingsListComponent implements OnInit {

  rippleColor: string;
  sprintSettings$!: Observable<SprintSetting[]>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry,
    private _sprintSettingsService: SprintSettingsService
  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;
  }

  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  onNavigate(to: number) {
    if (to === -1) {
      this._router.navigate(['settings', 'new', 'sprint-settings']);
      return;
    }
    this._router.navigate(['settings', 'sprint-settings', to]);
  }

  ngOnInit(): void {
    this._sprintSettingsService.requestSprintSettings();
    this.sprintSettings$ = this._sprintSettingsService.getSprintSettings();
  }
}
