import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Monster } from '../classes/monster';
import { MonsterSpezies } from '../enums/monsterSpezies.enum';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public card = document.getElementsByClassName('card-play');

  constructor(private router: Router, public user: UserService) { }

  public enemy = new Monster(
    'Henrik',
    'Tutorial-Goblin',
    { src: './assets/card-images/tutorial-goblin.jpg', alt: 'Henrik' },
    MonsterSpezies.goblin,
    { attack: 0.5, life: 1, shield: 0 },
    { content: '', show: false, click: () => { } },
    { content: 'Kämpfen', show: true, click: () => { this.fight(); } },
    10);

  public checkData(withData: string, withoutData: string) { // Check the localstorage of the client
    let data = this.getDataFromLocalStorage();
    if (data != false) {
      this.router.navigateByUrl('/' + withData);
    } else {
      this.router.navigateByUrl('/' + withoutData);
    }
  }

  public fight() {
    this.enemy.stats.life -= this.user.attack;
    this.user.health -= this.enemy.stats.attack;
    if (this.user.health <= 0) {
      alert('Du bist tot.');
      localStorage.clear();
      location.reload();
      return;
    }
    if (this.enemy.stats.life <= 0) { // check if the enemy is dead
      this.user.addXp(this.enemy.xp); // TODO give xp and more;
      this.newCard();
    }
    this.saveInLocalStorage(this.user, this.enemy);
  }

  public go() {
    // TODO enemy attack you
    this.newCard();
  }

  public newCard() {
    this.enemy.buttonLeft.click = () => { };
    this.enemy.buttonRight.click = () => { };
    this.card[0].classList.add('fallDown');
    setTimeout(() => {
      this.card[0].classList.add('none');
      this.card[0].classList.remove('fallDown');
      setTimeout(() => {
        this.enemy = this.getRandomMonster();
        this.card[0].classList.remove('none');
        this.saveInLocalStorage(this.user, this.enemy);
      }, 100);
    }, 450);
  }

  // localstorage
  public getDataFromLocalStorage(): boolean {
    try {
      let data: any = localStorage.getItem('fg:data');
      if (data == undefined) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }

  }

  public saveDataFromLocalStorage(): boolean {
    try {
      let data: any = localStorage.getItem('fg:data') || '{}';
      let functions: any = localStorage.getItem('fg:functions') || '{}';
      data = JSON.parse(data);
      functions = JSON.parse(functions);
      functions.buttonRight = eval('(' + functions.buttonRight + ')');
      functions.buttonLeft = eval('(' + functions.buttonLeft + ')');
      // user data
      this.user.username = data.user.username;
      this.user.gender = data.user.gender;
      this.user.health = data.user.health;
      this.user.attack = data.user.attack;
      this.user.shield = data.user.shield;
      this.user.lvl = data.user.lvl;
      this.user.xp = data.user.xp;
      this.user.maxXp = data.user.maxXp;
      this.user.gold = data.user.gold;
      // enemy
      this.enemy = data.enemy;
      this.enemy.buttonLeft.click = functions.buttonLeft;
      this.enemy.buttonRight.click = functions.buttonRight;

      return true;
    } catch (e) {
      return false;
    }

  }

  public saveInLocalStorage(_user: any, _enemy: any): boolean {
    try {
      //data
      let data = {
        user: _user,
        enemy: _enemy,
        settings: 'settings'
      }
      localStorage.setItem('fg:data', JSON.stringify(data));

      // functions
      let functions: any = {
        buttonLeft: _enemy.buttonLeft.click.toString(),
        buttonRight: _enemy.buttonRight.click.toString()
      }
      localStorage.setItem('fg:functions', JSON.stringify(functions));
      return true;
    } catch (e) {
      return false;
    }
  }

  public getRandomMonster() {
    return new Monster('Phillip', 'Goblin', { src: 'wild', alt: 'wild' }, MonsterSpezies.goblin, { attack: 5, life: 5, shield: 2 }, { content: 'Gehen', show: true, click: () => { this.go(); } }, { content: 'Kämpfen', show: true, click: () => { this.fight(); } }, 20);
  }
}
