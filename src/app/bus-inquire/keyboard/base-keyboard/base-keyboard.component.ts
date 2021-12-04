import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SoundEffectService } from 'src/app/service/sound-effect.service';
@Component({
  selector: 'app-base-keyboard',
  templateUrl: './base-keyboard.component.html',
  styleUrls: ['./base-keyboard.component.scss']
})
export class BaseKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  @Input() currentCity: string;
  @Input() cityLock: boolean = false;


  constructor(
    private soundEffectService: SoundEffectService,
  ) { }

  ngOnInit(): void {

  }

  cityOnClick() {
    this.soundEffectService.playAudio();
    this.emiter.emit('city');
  }

  moreOnClick() {
    this.soundEffectService.playAudio();
    this.emiter.emit('more');
  }

  keyOnClick(data: string) {
    this.soundEffectService.playAudio();
    this.emiter.emit(data);
  }

}
