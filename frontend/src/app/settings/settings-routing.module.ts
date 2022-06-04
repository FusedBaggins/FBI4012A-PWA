import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Local
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SprintListComponent } from './components/crud-sprint/sprint-list/sprint-list.component';
import { SprintSettingsListComponent } from './components/crud-sprint-settings/sprint-settings-list/sprint-settings-list.component';
import { SprintSettingsDetailComponent } from './components/crud-sprint-settings/sprint-settings-detail/sprint-settings-detail.component';

const routes: Routes = [
  { path: 'sprint', component: SprintListComponent },
  { path: 'sprint-settings/:id', component: SprintSettingsDetailComponent },
  { path: 'sprint-settings', component: SprintSettingsListComponent },
  { path: '', component: SettingsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
