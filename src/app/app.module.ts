import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';

import { ToastModule } from './toast/toast.module';
import { LoginComponent } from './login/login.component';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutes } from './app.routes';
import { FilmDatabaseComponent } from './film-database/film-database.component';




@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent,
    FilmDatabaseComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ToastModule,
    AppRoutes,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





