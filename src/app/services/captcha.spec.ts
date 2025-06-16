import { TestBed } from '@angular/core/testing';

import { CaptchaStateService } from './captcha';

describe('Captcha', () => {
  let service: CaptchaStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
