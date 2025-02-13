import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoachingComponent } from './coaching/coaching.component';
import { CoachingoffComponent } from './coachingoff/coachingoff.component';
import { FreecontentComponent } from './freecontent/freecontent.component';
import { ContentvitaminsComponent } from './contentvitamins/contentvitamins.component';
import { ContentsleepingComponent } from './contentsleeping/contentsleeping.component';
import { ContentworkoutComponent } from './contentworkout/contentworkout.component';
import { ContenthydrationComponent } from './contenthydration/contenthydration.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';



export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "home", component: HomeComponent},
    {path: "coaching", component: CoachingComponent},
    {path: "coachingoff", component: CoachingoffComponent},
    {path: "freecontent", component: FreecontentComponent},
    {path: "contentvitamins", component: ContentvitaminsComponent},
    {path: "contentsleeping", component: ContentsleepingComponent},
    {path: "contentworkout", component: ContentworkoutComponent},
    {path: "contenthydration", component: ContenthydrationComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "about", component: AboutComponent},
    {path: "contacts", component: ContactsComponent},
    {path: "**", component: HomeComponent}
];
