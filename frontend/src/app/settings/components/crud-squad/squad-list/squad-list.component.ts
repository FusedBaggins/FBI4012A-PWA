import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable } from 'rxjs';

// Local
import { Squad } from 'src/app/settings/interfaces/squad';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SquadService } from 'src/app/squad/services/squad.service';


@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.scss']
})
export class SquadListComponent implements OnInit {

  rippleColor: string;
  squads$!: Observable<Squad[]>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _squadService: SquadService,
    private _iconRegistry: MatIconRegistry,

  ) {
    this._sanitizeIcons();
    this.rippleColor = rippleColor;
  }


  private _sanitizeIcons(): void {
    this._iconRegistry.addSvgIcon('add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
  }

  onNavigate(to: number): void {
    if (to === -1) {
      this._router.navigate(['settings', 'new', 'squad']);
      return;
    }

    this._router.navigate(['settings', 'squad', to]);
  }

  ngOnInit(): void {
    this.squads$ = this._squadService.getSquads();
  }

}
