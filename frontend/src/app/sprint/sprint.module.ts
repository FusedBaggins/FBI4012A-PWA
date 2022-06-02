import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { SprintFilterComponent } from './components/sprint-filter/sprint-filter.component';
import { SprintDetailComponent } from './components/sprint-detail/sprint-detail.component';


@NgModule({
  declarations: [
    SprintListComponent,
    SprintFilterComponent,
    SprintDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBottomSheetModule,

    SprintRoutingModule
  ]
})
export class SprintModule { }
