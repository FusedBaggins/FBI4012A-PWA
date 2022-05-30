import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule} from '@angular/material/icon';

import { UtilsRoutingModule } from './utils-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    HomeComponent,
    AuthenticationComponent,
    RouteNotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UtilsRoutingModule,

    MatIconModule,
    MatRippleModule,

  ]
})
export class UtilsModule { }
