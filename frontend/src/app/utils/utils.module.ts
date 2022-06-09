import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';

import { UtilsRoutingModule } from './utils-routing.module';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsRoutingModule,

    MatIconModule,
    MatRippleModule,

  ],
  exports: [
    HeaderComponent
  ]
})
export class UtilsModule { }
