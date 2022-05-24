import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { UserService } from 'src/app/services/user.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-devTools',
  templateUrl: './devTools.component.html',
  styleUrls: ['./devTools.component.scss']
})
export class DevToolsComponent implements OnInit {

  public toolsClose = document.getElementsByClassName('toolsClose');
  public toolsOpen = document.getElementsByClassName('toolsOpen');
  public devToolsInput = document.getElementsByClassName('devToolsInput');


  constructor(public game: GameService, public user: UserService) { }

  ngOnInit() {
  }

  public close() {
    this.toolsClose[0].classList.add('none');
    this.toolsOpen[0].classList.remove('none');
  }

  public open() {
    this.toolsClose[0].classList.remove('none');
    this.toolsOpen[0].classList.add('none');
  }

  public deleteLocalStorage() {
    localStorage.clear();
  }

  public refresh() {
    location.reload();
  }

  public openAndCloseDevToolsInput() {
    let data = localStorage.getItem('fg:data');
    if (data != null) {
      data = prompt('fg:data:', data);
      if (typeof data == 'string') {
        localStorage.setItem('fg:data', data);
      }
      this.refresh();
    }
  }

  public addItemToInventory() {
    let input: string | null = prompt('Gebe die ID des Items ein (Liste aller Items ist auf https://www.github.com/Madu-de/fightgame zu finden):');
    if (typeof input == 'string') {
      let item: Item = this.game.getItemByIdName(input);

      if (item == undefined) {
        alert(`Dieses Item { ${input} } existiert nicht!`);
        return;
      }

      for (let i = 2; i < 11; i++) {
        const element = this.game.inventory[i];
        if (element == undefined) {
          this.game.inventory[i] = item;
          this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory)
          return;
        }
      }
    }
  }

  public setHealth() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Health?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.health = parseFloat(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }

  public setAttack() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Attack?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.attack = parseFloat(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }

  public setShield() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Shield?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.shield = parseFloat(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }

  public setGold() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Gold?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.gold = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }

  public setXp() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Xp?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.xp = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }

  public setLvl() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Level?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.lvl = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy, this.game.inventory);
  }


}
