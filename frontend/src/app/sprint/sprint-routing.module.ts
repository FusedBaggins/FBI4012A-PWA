import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SprintListComponent } from './componentes/sprint-list/sprint-list.component';

const routes: Routes = [
  { path: '', component: SprintListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
