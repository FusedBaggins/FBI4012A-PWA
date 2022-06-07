import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Local
import { rippleColor } from 'src/app/utils/constants/ripple-color';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  buttons: any[];
  rippleColor: string;

  constructor(private _router: Router) {
    this.rippleColor = rippleColor;
    this.buttons = [
      { label: 'Configurações de sprint', navigateTo: 'sprint-settings' },
      { label: 'Sprints', navigateTo: 'sprint' },
      { label: 'Squads', navigateTo: 'squad' },
      { label: 'Usuários', navigateTo: 'user' },
    ];
  }

  onNavigate(to?: string): void {
    switch (to) {
      case 'user':
        this._router.navigate(['settings', 'user']);
        break;
      case 'sprint':
        this._router.navigate(['settings', 'sprint']);
        break;
      case 'squad':
        this._router.navigate(['settings', 'squad']);
        break;
      case 'sprint-settings':
        this._router.navigate(['settings', 'sprint-settings']);
        break;
      default:
        break;
    }
  }


  ngOnInit(): void { }

}
