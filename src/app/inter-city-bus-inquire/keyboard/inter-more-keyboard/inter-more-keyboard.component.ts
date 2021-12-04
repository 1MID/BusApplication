import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SoundEffectService } from 'src/app/service/sound-effect.service';

@Component({
  selector: 'app-inter-more-keyboard',
  templateUrl: './inter-more-keyboard.component.html',
  styleUrls: ['./inter-more-keyboard.component.scss']
})
export class InterMoreKeyboardComponent implements OnInit {
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
