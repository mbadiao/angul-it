import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      return localStorage;
    }
    // Return a mock storage for SSR
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null
    } as Storage;
  }
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  private platformId = inject(PLATFORM_ID);
  public storage = inject(BROWSER_STORAGE);

  get(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.storage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.setItem(key, value);
    }
  }

  remove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.removeItem(key);
    }
  }
}