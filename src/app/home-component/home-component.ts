import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha';

@Component({
  selector: 'app-home-component',
  imports: [NgOptimizedImage],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {
  private  router = inject(Router);
  private  captachService = inject(CaptchaStateService);

  private state = this.captachService.getCurrentState();
  hasProgres = this.state.completedChallenges > 0 && this.state.isCompleted;
  completedChallenges = this.state.completedChallenges;
  totalChalanges = this.state.totalChallenges;

  startCaptcha(): void {
    this.captachService.resetState();
    this.router.navigate(["/captcha"]);
  }

  continueCaptcha(): void {
    this.router.navigate(["/captcha"]);
  }

  resetProgress(): void{
    this.captachService.resetState();
    this.hasProgres = false;
    this.completedChallenges = 0
  }
}
