import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { SoundEffectService } from 'src/app/service/sound-effect.service';

@Component({
  selector: 'app-inter-base-keyboard',
  templateUrl: './inter-base-keyboard.component.html',
  styleUrls: ['./inter-base-keyboard.component.scss']
})
export class InterBaseKeyboardComponent implements OnInit {
  @Output() emiter = new EventEmitter<any>();
  @Input() cityLock: boolean = true; //把除了城市以外的都鎖起來

  constructor(
    private soundEffectService: SoundEffectService,
  ) { }

  ngOnInit(): void {
  }

  keyOnClick(data: string) {
    this.soundEffectService.playAudio();
    this.emiter.emit(data);
  }

}
