import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatRippleModule } from '@angular/material/core';

// Local
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './components/settings-list/settings-list.component';


@NgModule({
  declarations: [
    SettingsListComponent
  ],
  imports: [
    CommonModule,

    // Angular Material
    MatRippleModule,

    // Local
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
