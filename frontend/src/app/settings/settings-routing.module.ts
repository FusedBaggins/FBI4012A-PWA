import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Local
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SprintListComponent } from './components/crud-sprint/sprint-list/sprint-list.component';
import { SquadDetailComponent } from './components/crud-squad/squad-detail/squad-detail.component';
import { SprintDetailComponent } from './components/crud-sprint/sprint-detail/sprint-detail.component';
import { SprintSettingsListComponent } from './components/crud-sprint-settings/sprint-settings-list/sprint-settings-list.component';
import { SprintSettingsDetailComponent } from './components/crud-sprint-settings/sprint-settings-detail/sprint-settings-detail.component';

const routes: Routes = [
  { path: 'new/squad', component: SquadDetailComponent },  
  { path: 'new/sprint', component: SprintDetailComponent },  
  { path: 'new/sprint-settings', component: SprintSettingsDetailComponent }, 
  { path: 'sprint/:id', component: SprintDetailComponent },
  { path: 'squad/:id', component: SquadDetailComponent },  
  { path: 'sprint-settings/:id', component: SprintSettingsDetailComponent },
  { path: 'sprint', component: SprintListComponent },
  { path: 'sprint-settings', component: SprintSettingsListComponent },
  { path: '', component: SettingsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
