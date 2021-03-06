import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'user', loadChildren: () => import('src/app/utils/utils.module').then(module => module.UtilsModule) },
  { path: 'squad', loadChildren: () => import('src/app/squad/squad.module').then(module => module.SquadModule) },
  { path: 'sprint', loadChildren: () => import('src/app/sprint/sprint.module').then(module => module.SprintModule) },
  { path: 'settings', loadChildren: () => import('src/app/settings/settings.module').then(module => module.SettingsModule) },
  { path: '', loadChildren: () => import('src/app/main/main.module').then(module => module.MainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
