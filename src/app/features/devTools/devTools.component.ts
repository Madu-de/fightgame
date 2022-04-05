import { Component, OnInit } from '@angular/core';
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

  public setHealth() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Health?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.health = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy);
  }

  public setAttack() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Attack?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.attack = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy);
  }

  public setShield() {
    let input: string | null = null;
    while (input == null) {
      input = prompt('Wie viel Shield?', '50');
    }
    if (input == '') {
      input = '0';
    }
    this.user.shield = parseInt(input);
    this.game.saveInLocalStorage(this.user, this.game.enemy);
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
    this.game.saveInLocalStorage(this.user, this.game.enemy);
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
    this.game.saveInLocalStorage(this.user, this.game.enemy);
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
    this.game.saveInLocalStorage(this.user, this.game.enemy);
  }


}
