import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core';

// Local
import { UtilsModule } from '../utils/utils.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SquadListComponent } from './components/crud-squad/squad-list/squad-list.component';
import { SprintListComponent } from './components/crud-sprint/sprint-list/sprint-list.component';
import { SquadDetailComponent } from './components/crud-squad/squad-detail/squad-detail.component';
import { SprintDetailComponent } from './components/crud-sprint/sprint-detail/sprint-detail.component';
import { SprintSettingsListComponent } from './components/crud-sprint-settings/sprint-settings-list/sprint-settings-list.component';
import { SprintSettingsDetailComponent } from './components/crud-sprint-settings/sprint-settings-detail/sprint-settings-detail.component';


@NgModule({
  declarations: [
    SquadListComponent,
    SprintListComponent,
    SquadDetailComponent,
    SettingsListComponent,
    SprintDetailComponent,
    SprintSettingsListComponent,
    SprintSettingsDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    // Angular Material
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,

    // Local
    UtilsModule,
    SettingsRoutingModule

  ]
})
export class SettingsModule { }
