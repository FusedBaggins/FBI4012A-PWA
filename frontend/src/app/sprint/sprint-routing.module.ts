import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { SprintDetailComponent } from './components/sprint-detail/sprint-detail.component';

const routes: Routes = [
  { path: ':id', component: SprintDetailComponent },
  { path: '', component: SprintListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
