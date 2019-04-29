import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { FilmDatabaseComponent } from './film-database/film-database.component';
import { Component } from '@angular/core';


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
        path: 'filmdatabase',
        component: FilmDatabaseComponent,
    },
    // {
    //     path: '**',
    //     redirectTo: '/login',
    // },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
