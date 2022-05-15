import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(public game: GameService, public user: UserService) { }

  ngOnInit() {
    this.game.checkData('inventory', '');
  }

}
