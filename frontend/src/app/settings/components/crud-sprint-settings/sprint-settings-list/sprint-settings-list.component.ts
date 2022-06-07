import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private _sprintSettingsService: SprintSettingsService
  ) {
    this.rippleColor = rippleColor;
  }

  onNavigate(to: number) {
    this._router.navigate(['settings', 'sprint-settings', to]);
  }

  ngOnInit(): void {
    this._sprintSettingsService.requestSprintSettings();
    this.sprintSettings$ = this._sprintSettingsService.getSprintSettings();
  }
}
