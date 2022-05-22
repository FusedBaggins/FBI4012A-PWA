import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';


@NgModule({
  declarations: [
    HomeComponent,
    AuthenticationComponent,
    RouteNotFoundComponent
  ],
  imports: [
    CommonModule,
    UtilsRoutingModule
  ]
})
export class UtilsModule { }
