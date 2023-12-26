import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  constructor() {}

  public playSound(type: string) {
    const audio = new Audio();
    switch (type) {
      case 'loading':
        audio.src = 'assets/sounds/loading_data.mp3';
        break;
      case 'enter':
        audio.src = 'assets/sounds/enter.mp3';
        break;
      case 'abort':
        audio.src = 'assets/sounds/abort.mp3';
        break;
      case 'success':
        audio.src = 'assets/sounds/success.mp3';
        break;
      case 'warning':
        audio.src = 'assets/sounds/warning.mp3';
        break;
      default:
        return;
    }
    audio.play();
  }
}
