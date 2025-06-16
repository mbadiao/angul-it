import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha';
import { map } from 'rxjs';

export const captchaGuard: CanActivateFn = (route, state) => {
  const captchaService = inject(CaptchaStateService);
  const router = inject(Router);

   return captchaService.state$.pipe(
    map((captchaState) => {
      if (captchaState.isCompleted) {
        return true;
      } else {
        router.navigate(['/captcha']);
        return false;
      }
    })
  );
};
