import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  declarations: [
    HomeComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    UtilsRoutingModule
  ]
})
export class UtilsModule { }
