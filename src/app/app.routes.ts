import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./main/main/main.routes').then((c) => c.routes)},
];
