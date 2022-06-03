import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Local
import { SettingsListComponent } from './components/settings-list/settings-list.component';

const routes: Routes = [
  { path: 'user', component: SettingsListComponent },
  { path: '', component: SettingsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
