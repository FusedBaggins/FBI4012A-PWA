import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Angular Material
import { MatIconRegistry } from '@angular/material/icon';

// Third-party
import { Observable } from 'rxjs';

// Local
import { Sprint } from 'src/app/sprint/interfaces/sprint';
import { rippleColor } from 'src/app/utils/constants/ripple-color';
import { SprintService } from 'src/app/sprint/services/sprint.service';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  rippleColor!: string;
  sprints$!: Observable<Sprint[]>;

  constructor(
    private _router: Router,
    private _sanitizer: DomSanitizer,
    private _sprintService: SprintService,
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
      this._router.navigate(['settings', 'new', 'sprint']);
      return;
    }

    this._router.navigate(['settings', 'sprint', to]);
  }

  ngOnInit(): void {
    this.sprints$ = this._sprintService.getSprints();
  }

}
