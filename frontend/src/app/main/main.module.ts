import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { MainRoutingModule } from './main-routing.module';
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
    HttpClientModule,

    // Angular Material
    MatIconModule,
    MatRippleModule,

    // Local
    MainRoutingModule,
  ]
})
export class MainModule { }
