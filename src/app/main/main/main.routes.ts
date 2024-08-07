import { Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';

export const routes: Routes = [
    {
        path: '', component: LandingComponent,
        data: {
            routeName: 'home'
        }
    },
    {
        path: 'mission', loadComponent: () => import('../../pages/mission/mission.component').then((c) => c.MissionComponent),
        data: {
            routeName: 'mission'
        }
    },
    {
        path: 'contact', loadComponent: () => import('../../pages/contact/contact.component').then((c) => c.ContactComponent),
        data: {
            routeName: 'contact'
        }
    },
];
