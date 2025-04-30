import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar-persona', component: RegistrarPersonaComponent },
];
