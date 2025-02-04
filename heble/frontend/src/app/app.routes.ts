import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoachingComponent } from './coaching/coaching.component';
import { SigninComponent } from './signin/signin.component';
import { FreecontentComponent } from './freecontent/freecontent.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContentvitaminsComponent } from './contentvitamins/contentvitamins.component';


export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "home", component: HomeComponent},
    {path: "coaching", component: CoachingComponent},
    {path: "freecontent", component: FreecontentComponent},
    {path: "contentvitamins", component: ContentvitaminsComponent},
    {path: "signin", component: SigninComponent},
    {path: "about", component: AboutComponent},
    {path: "contacts", component: ContactsComponent},
    {path: "**", component: HomeComponent}
];
