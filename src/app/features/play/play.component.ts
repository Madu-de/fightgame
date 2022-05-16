import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(public game: GameService) { }

  ngOnInit() {
    this.game.checkData('play', '');
    this.game.saveDataFromLocalStorage();
    console.log(this.game.getAllItemsWithTheSameCategory('sword'));
  }

}
