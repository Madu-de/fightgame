import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buttons-bottom',
  templateUrl: './buttons-bottom.component.html',
  styleUrls: ['./buttons-bottom.component.scss']
})
export class ButtonsBottomComponent implements OnInit {

  constructor(private user: UserService, private game: GameService) { }

  ngOnInit() {
  }

  public myClickHandler(): void {

  }

}
