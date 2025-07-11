import { TestBed } from '@angular/core/testing';

import { CaptchaStateService } from './captcha';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Captcha', () => {
  let service: CaptchaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(CaptchaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
