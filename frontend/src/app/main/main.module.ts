import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  declarations: [
    HomeComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule
  ]
})
export class MainModule { }
