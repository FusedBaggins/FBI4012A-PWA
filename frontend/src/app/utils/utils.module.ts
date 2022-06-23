import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UtilsRoutingModule } from './utils-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,

  ],
  exports: [
    HeaderComponent,
    ConfirmationDialogComponent
  ]
})
export class UtilsModule { }
