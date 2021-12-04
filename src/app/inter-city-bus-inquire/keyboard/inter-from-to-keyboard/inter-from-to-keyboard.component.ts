import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SoundEffectService } from 'src/app/service/sound-effect.service';
@Component({
  selector: 'app-inter-from-to-keyboard',
  templateUrl: './inter-from-to-keyboard.component.html',
  styleUrls: ['./inter-from-to-keyboard.component.scss']
})
export class InterFromToKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();

  constructor(
    private soundEffectService: SoundEffectService
  ) { }

  ngOnInit(): void {
  }

  btnOnClick(data: string) {
    this.soundEffectService.playAudio();
    this.emiter.emit(data);
  }
}
