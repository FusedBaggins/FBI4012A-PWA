import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Third-party
import { Observable } from 'rxjs';

// Local
import { SprintSettingsService } from 'src/app/settings/services/sprint-settings.service';
import { rippleColor } from 'src/app/utils/constants/ripple-color';

@Component({
  selector: 'app-sprint-settings-list',
  templateUrl: './sprint-settings-list.component.html',
  styleUrls: ['./sprint-settings-list.component.scss']
})
export class SprintSettingsListComponent implements OnInit {

  rippleColor: string;
  sprintSettings$!: Observable<any>;

  constructor(
    private _router: Router,
    private _sprintSettingsService: SprintSettingsService
  ) {
    this.rippleColor = rippleColor;
  }

  ngOnInit(): void {
    this._sprintSettingsService.requestSprintSettings();  
    this.sprintSettings$ = this._sprintSettingsService.getSprintSettings();
  }
}
