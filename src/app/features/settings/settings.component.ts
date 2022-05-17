import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public game: GameService, public user: UserService) { }

  ngOnInit() {
    this.game.checkData('settings', '');
    this.game.saveDataFromLocalStorage();
  }

}
