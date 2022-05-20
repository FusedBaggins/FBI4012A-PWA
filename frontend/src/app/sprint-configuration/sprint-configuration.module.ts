import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SprintConfigurationRoutingModule } from './sprint-configuration-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SprintConfigurationRoutingModule
  ]
})
export class SprintConfigurationModule { }
