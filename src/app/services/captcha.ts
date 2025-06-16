import { Injectable, Inject,InjectionToken, inject } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { BrowserStorageService } from './storage';

export interface Challenge {
  id: number;
  type: "image" | "math" | "text";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  completed: boolean;
}


export interface CaptchaState {
  currentChallengeIndex: number;
  challenges: Challenge[];
  totalChallenges: number;
  completedChallenges: number;
  isCompleted: boolean;
  startTime: Date;
  endTime?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
  private readonly STORAGE_KEY = 'captcha_state';  

  private storage = inject(BrowserStorageService);

  private stateSubject: BehaviorSubject<CaptchaState>;
  public state$: Observable<CaptchaState>;

  constructor() {
    const loaded = this.loadState();
    this.stateSubject = new BehaviorSubject<CaptchaState>(loaded);
    this.state$ = this.stateSubject.asObservable();
  }

  private initialState: CaptchaState = {
    currentChallengeIndex : 0,
    challenges: this.generateChanllenges(),
    totalChallenges: 3,
    completedChallenges: 0,
    isCompleted: false,
    startTime: new Date()
  }
    

  private generateChanllenges() : Challenge[] {
    return [
      {
        id: 1,
        type: 'image',
        question: 'Selectionez tous les emojis de coeur',
        options: [
          '​❤️​',
          '​🥱​',
          '​​🩷​',
          '​​👗​',
          '​​💛​',
          '​​​🤣​'
        ],
        correctAnswer: "1,3,5",
        completed: false
      },
      {
        id: 2,
        type: 'math',
        question: 'What is 15 + 27?',
        correctAnswer: 42,
        completed: false
      },
      {
        id: 3,
        type: 'text',
        question: 'Type the characters you see: "K7mR9"',
        correctAnswer: 'K7mR9',
        completed: false
      }
    ];
  }

  getCurrentState(): CaptchaState {
    return this.stateSubject.value;
  }

  resetState(): void {
    this.updateState(this.initialState);
    this.storage.remove(this.STORAGE_KEY);
  }

  private updateState(newState: CaptchaState): void {
    this.stateSubject.next(newState);
    this.saveState(newState);
  }

  private saveState(state: CaptchaState) : void {
      this.storage.set(this.STORAGE_KEY,JSON.stringify(state));
  }

  private loadState(): CaptchaState {
      const saved = this.storage.get(this.STORAGE_KEY);
      if(saved) {
        const parsedState = JSON.parse(saved);

        return {
          ...parsedState,
          startTime: new Date(parsedState.startTime),
          endTime: parsedState.endTime ? new Date(parsedState.endTime) : undefined
        };
      }
    return this.initialState;
  }

  nextChallenge(): void {
    const currentState = this.getCurrentState();
    if (currentState.currentChallengeIndex < currentState.totalChallenges - 1) {
      this.updateState({
        ...currentState,
        currentChallengeIndex: currentState.currentChallengeIndex + 1
      });
    }
  }

  private validateAnswer(challenge: Challenge, userAnswer: string | number): boolean {
    if (challenge.type === 'image') {
      
      return userAnswer === challenge.correctAnswer.toString();
    }
    if (challenge.type === 'math') {
      return Number(userAnswer) === Number(challenge.correctAnswer);
    }
    if (challenge.type === 'text') {
      return userAnswer.toString().trim() === challenge.correctAnswer.toString();
    }
    return false;
  }

  completeChallenge(challengeId: number, userAnswer: number | string): boolean {

    const currentState = this.getCurrentState();
    const challenge = currentState.challenges.find(c => c.id === challengeId);

    if(!challenge) return false;

    const isCorrect = this.validateAnswer(challenge,userAnswer);

    if(isCorrect) {
      challenge.completed = true;
      const newState = {
        ...currentState,
        completedChallenges: currentState.completedChallenges + 1,
        challenges: [...currentState.challenges]
      };

      if(newState.completedChallenges === newState.totalChallenges) {
        newState.isCompleted = true;
        newState.endTime = new Date();
      }

      this.updateState(newState);
      return true;
    }
    return false;
  } 
}
