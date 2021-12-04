import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SoundEffectService } from 'src/app/service/sound-effect.service';

@Component({
  selector: 'app-more-keyboard',
  templateUrl: './more-keyboard.component.html',
  styleUrls: ['./more-keyboard.component.scss']
})
export class MoreKeyboardComponent implements OnInit {
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
