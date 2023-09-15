import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { EventComponent } from './event/event.component';
import { HttpClientModule } from '@angular/common/http';
import { ContainerFormService } from './container/container-form.service';
import { WczytajOsobyComponent } from './wczytaj-osoby/wczytaj-osoby.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    EventComponent,
    WczytajOsobyComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ContainerFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
