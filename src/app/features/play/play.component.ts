import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.randomaction();
    this.gameService.test();
  }

  randomaction() {
  }

}
