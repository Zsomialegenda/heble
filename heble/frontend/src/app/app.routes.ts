import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FreecontentComponent } from './freecontent/freecontent.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "home", component: HomeComponent},
    {path: "freecontent", component: FreecontentComponent},
    {path: "signup", component: SignupComponent},
    {path: "about", component: AboutComponent},
    {path: "contacts", component: ContactsComponent},
    {path: "**", component: HomeComponent}
];
