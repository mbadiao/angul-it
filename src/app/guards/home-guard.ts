import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const homeGuard: CanActivateFn = (route, state) => {
  const captchaService = inject(CaptchaStateService);
  const router = inject(Router);

  return captchaService.state$.pipe(
    map((state) => {
      if (state.completedChallenges <= 0){
        return true;
      }
        router.navigate(['/captcha']);
        return false;
    })
  )
};
