import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundEffectService {

  audio
  constructor() {
    this.audio = new Audio();
    this.audio.src = "assets/common/sound.mp3";
    this.audio.load();
  }

  playAudio() {
    this.audio.play();
  }

}
