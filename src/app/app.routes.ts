import { Routes } from '@angular/router';
import { ResultComponent } from './result-component/result-component';
import { HomeComponent } from './home-component/home-component';
import { CaptchaComponent } from './captcha-component/captcha-component';
import { captchaGuard } from './guards/captcha-guard';
import { homeGuard } from './guards/home-guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
        canActivate: [homeGuard]
    },
    {
        path: 'captcha',
        component: CaptchaComponent,
        title: 'Result'
    },
    {
        path: 'result',
        component: ResultComponent,
        title: 'Result',
        canActivate: [captchaGuard]
    },
    {
        path: '**',
        component: HomeComponent,
        title: 'Home page'
    },
];
