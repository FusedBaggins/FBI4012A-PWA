import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Local
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: '404', component: RouteNotFoundComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
