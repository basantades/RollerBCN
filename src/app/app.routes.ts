import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GraficosComponent } from './components/graficos/graficos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'mapa', component: MapaComponent }, 
    { path: 'calendario', component: CalendarioComponent},
    { path: 'graficos', component: GraficosComponent },
    { path: '**', redirectTo: '' } 
];
