import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaStateService } from '../services/captcha';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result-component',
  imports: [CommonModule],
  templateUrl: './result-component.html',
  styleUrl: './result-component.css'
})
export class ResultComponent {
  captchaService = inject(CaptchaStateService);
  router = inject(Router)
  state = this.captchaService.getCurrentState();
  goHome(): void {
    this.captchaService.resetState();
    this.router.navigate(['']);
  }

  retryVerification(): void {
    this.captchaService.resetState();
    this.router.navigate(['captcha']);
  }
}
