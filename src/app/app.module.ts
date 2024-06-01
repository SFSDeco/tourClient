import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TourListComponent } from './tour-list/tour-list/tour-list.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { TourService } from './service/tour-service.service';
import { TourLogListComponent } from './tour-log-list/tour-log-list.component';
import { TourLogService } from './service/tour-log-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TourListComponent,
    TourFormComponent,
    TourLogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TourService,
    TourLogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
