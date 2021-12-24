import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { OwnerComponent } from './owner/owner.component';
import { ShowcarComponent } from './car/showcar/showcar.component';
import { EditcarComponent } from './car/editcar/editcar.component';
import { ViewcarComponent } from './car/viewcar/viewcar.component';
import { ShowownerComponent } from './owner/showowner/showowner.component';
import { EditownerComponent } from './owner/editowner/editowner.component';
import { ViewownerComponent } from './owner/viewowner/viewowner.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    OwnerComponent,
    ShowcarComponent,
    EditcarComponent,
    ViewcarComponent,
    ShowownerComponent,
    EditownerComponent,
    ViewownerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
