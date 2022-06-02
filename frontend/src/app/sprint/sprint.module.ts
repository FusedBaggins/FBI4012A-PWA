import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SprintListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    MatIconModule,
    MatRippleModule,
    SprintRoutingModule
  ]
})
export class SprintModule { }
