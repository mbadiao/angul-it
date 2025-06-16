import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CaptchaState, CaptchaStateService, Challenge } from '../services/captcha';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css'
})

export class CaptchaComponent implements OnInit,OnDestroy {
  
  state : CaptchaState | null = null;
  currentChallenge: Challenge | null = null;

  selectedImages: number[] = [];
  mathAnswer: number | null = null;
  textAnswer: string = '';

  showError = false;
  showSuccess = false;

  private destroy$ = new Subject<void>();
  private captchaService = inject(CaptchaStateService);
  private route = inject(Router);
  
  ngOnInit(): void {
    this.captchaService.state$
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
            this.state = state;
            if (state && state.isCompleted) {
        this.route.navigate(['result']);
      } else {
        this.updateCurrentChallenge();
      }

        }
        );
  }
          
  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleImageSelection(imageIndex: number): void {
    //on verifie si il a deja etait selectioner 
    const index = this.selectedImages.indexOf(imageIndex);

    if (index > -1) {
      //si oui on l'enleve 
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(imageIndex);
    }
  }

 updateCurrentChallenge(): void {
  if (this.state) {
    const next = this.state.challenges.find(ch => !ch.completed);
    this.currentChallenge = next ?? null;

     if (this.currentChallenge) {
        this.resetInputs();
        this.showError = false;
        this.showSuccess = false;
      }
  }
}


   canSubmit(): boolean {
    if (!this.currentChallenge) return false;
    switch (this.currentChallenge.type) {
      case 'image':
        return this.selectedImages.length > 0;
      case 'math':
        return this.mathAnswer !== null && this.mathAnswer !== undefined;
      case 'text':
        return this.textAnswer.trim().length > 0;
      default:
        return false;
    }
  }

  submitAnswer(): void {
  if (!this.currentChallenge || this.state?.isCompleted) return;
  let userAnswer: string | number;

  switch (this.currentChallenge.type) {
    case 'image':
      userAnswer = this.selectedImages.sort((a, b) => a - b).join(',');
      break;
    case 'math':
      if (this.mathAnswer === null) return;
      userAnswer = this.mathAnswer;
      break;
    case 'text':
      userAnswer = this.textAnswer.trim();
      break;
    default:
      return;
  }

  let isCorrect: boolean = this.captchaService.completeChallenge(this.currentChallenge.id,userAnswer);

  
  
  if (isCorrect) {
    this.showSuccess = true;
    this.showError = false;
    this.currentChallenge.completed = true;

    if (this.state!.completedChallenges >= this.state!.totalChallenges) {
      this.state!.isCompleted = true;
      this.route.navigate(['result']);
    } else {
      this.showSuccess = false;
      this.resetInputs();
    }
  } else {
    this.showError = true;
    this.showSuccess = false;
  }
}
  resetInputs(): void {
  this.mathAnswer = null;
  this.textAnswer = '';
  this.selectedImages = [];
}

}
