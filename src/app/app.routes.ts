import { Routes } from '@angular/router';
import { ResultComponent } from './result-component/result-component';
import { HomeComponent } from './home-component/home-component';
import { CaptchaComponent } from './captcha-component/captcha-component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'captcha',
        component: CaptchaComponent,
        title: 'Result'
    },
    {
        path: 'result',
        component: ResultComponent,
        title: 'Result'
    }
];
