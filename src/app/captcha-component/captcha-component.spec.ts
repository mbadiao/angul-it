import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaComponent } from './captcha-component';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { CaptchaState,Challenge } from '../services/captcha';

describe('CaptchaComponent', () => {
  let component: CaptchaComponent;
  let fixture: ComponentFixture<CaptchaComponent>;

   function generateChanllenges() : Challenge[] {
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

  const mockData: CaptchaState = {
      currentChallengeIndex : 0,
      challenges: generateChanllenges(),
      totalChallenges: 3,
      completedChallenges: 0,
      isCompleted: false,
      startTime: new Date()
    }
      

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should set state on ngOnInit and not be null', () => {
    component.ngOnInit();
    expect(component.state).not.toBeNull();
    expect(component.state!.isCompleted).toBeFalse();
  })
});


