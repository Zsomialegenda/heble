import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InformationsComponent } from './informations/informations.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "home", component:HomeComponent},
    {path: "informations", component:InformationsComponent},
    {path: "**", component: HomeComponent}
];
