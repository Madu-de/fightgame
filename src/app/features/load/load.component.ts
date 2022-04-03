import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '../../classes/LocalStorage';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit() {
    this.game.checkData('play', 'create');
  }
}
