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

  private actionIsRunning: boolean = false;

  constructor(private router: Router, public user: UserService) { }

  public allMonsters: Monster[] = [
    new Monster('Igor', 'Pferd-Herrscher', { src: './assets/card-images/igor.png', alt: 'Igor' }, MonsterSpezies.herrscher, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 50),
    new Monster('Gerian', 'Troll', { src: './assets/card-images/gerian.png', alt: 'Gerian' }, MonsterSpezies.troll, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 20),
    new Monster('Lina', 'Drachen-Hexe', { src: './assets/card-images/lina.jpg', alt: 'Lina' }, MonsterSpezies.hexe, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 40),
    new Monster('Lilli', 'Drachen-Assasinin', { src: './assets/card-images/lilli.jpg', alt: 'lilli' }, MonsterSpezies.assasine, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 60)
  ]

  public allBosses = [

  ]

  public enemy = new Monster(
    'Henrik',
    'Tutorial-Goblin',
    { src: './assets/card-images/tutorial-goblin.jpg', alt: 'Henrik' },
    MonsterSpezies.goblin,
    { content: '', show: false, click: () => { } },
    { content: 'Kämpfen', show: true, click: () => { this.fight(); } }, 10);

  public checkData(withData: string, withoutData: string) { // Check the localstorage of the client
    let data = this.getDataFromLocalStorage();
    if (data != false) {
      this.router.navigateByUrl('/' + withData);
    } else {
      this.router.navigateByUrl('/' + withoutData);
    }
  }

  public fight() { // TODO shield
    if (!this.actionIsRunning) {
      this.actionIsRunning = true;
      this.card[0].classList.remove('shake');
      this.enemy.stats.life -= this.user.attack; // attack the enemy
      if (this.enemy.stats.life < 0) {
        this.enemy.stats.life = 0;
      }
      this.card[0].classList.add('shake');
      this.card[0].classList.remove('fadeInObject'); // to prevent design bugs
      setTimeout(() => { // after shake animation
        this.card[0].classList.remove('shake');
        if (this.enemy.stats.life <= 0) { // check if the enemy is dead
          this.user.addXp(this.enemy.xp);
          this.newCard();
          this.actionIsRunning = false;
          return;
        }
        this.user.health -= this.enemy.stats.attack; // attack the user
        this.saveInLocalStorage(this.user, this.enemy);
        this.actionIsRunning = false;
        if (this.user.health <= 0) { // check if the user is dead
          alert('Du bist tot.');
          localStorage.clear();
          location.reload();
          return;
        }
      }, 400);
    }
  }

  public go() {
    if (!this.actionIsRunning) {
      this.actionIsRunning = true;
      this.card[0].classList.remove('shake');
      let random = Math.floor(Math.random() * 5) + 1;
      if (random == 3) { // 20% chance
        this.card[0].classList.add('fallUp');
        setTimeout(() => {
          this.card[0].classList.add('shake');
          this.card[0].classList.remove('fallUp');
          setTimeout(() => {
            this.user.health -= this.enemy.stats.attack; // attack the user
            if (this.user.health <= 0) { // check if the user is dead
              alert('Du bist tot.');
              localStorage.clear();
              location.reload();
              return;
            }
            this.actionIsRunning = false;
          }, 500);
        }, 850);
      } else {
        this.actionIsRunning = false;
        this.newCard();
      }
    }
  }

  public newCard() {
    this.card[0].classList.remove('shake');
    this.card[0].classList.add('fallDown');
    setTimeout(() => {
      this.card[0].classList.add('none');
      this.card[0].classList.add('fadeInObject');
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

  public getRandomMonster(): Monster {
    let random = Math.floor(Math.random() * this.allMonsters.length);
    let monster: Monster = this.allMonsters[random];
    monster.setStats(this.user.lvl);
    return monster;
  }
}
