import { TestBed } from '@angular/core/testing';

import { BrowserStorageService } from './BrowserStorageService';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
