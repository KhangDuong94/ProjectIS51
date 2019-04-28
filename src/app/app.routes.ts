import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { Component } from '@angular/core';
import { FilmComponent } from '../app/film/film.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'contacts',
        component: ContactComponent
    },
    {
        path: '**',
        component: LoginComponent
    },
    {
        path: 'film',
        component: FilmComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
