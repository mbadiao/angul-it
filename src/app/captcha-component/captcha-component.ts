import { Component } from '@angular/core';

@Component({
  selector: 'app-captcha-component',
  imports: [],
  templateUrl: './captcha-component.html',
  styleUrl: './captcha-component.css'
})
export class CaptchaComponent {
  showOverlay(event: PointerEvent): void {
    event.preventDefault();
    console.log("Show overlay")
  }
}
