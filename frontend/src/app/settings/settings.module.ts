import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Local
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SprintListComponent } from './components/crud-sprint/sprint-list/sprint-list.component';
import { SprintSettingsListComponent } from './components/crud-sprint-settings/sprint-settings-list/sprint-settings-list.component';
import { SprintSettingsDetailComponent } from './components/crud-sprint-settings/sprint-settings-detail/sprint-settings-detail.component';


@NgModule({
  declarations: [
    SettingsListComponent,
    SprintListComponent,
    SprintSettingsListComponent,
    SprintSettingsDetailComponent,
  ],
  imports: [
    CommonModule,

    // Angular Material
    MatRippleModule,
    MatSnackBarModule,

    // Local
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
