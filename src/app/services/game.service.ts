import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Armor } from '../classes/armor';
import { Boss } from '../classes/boss';
import { Fee } from '../classes/fee';
import { Item } from '../classes/item';
import { Monster } from '../classes/monster';
import { Potion } from '../classes/potion';
import { Sword } from '../classes/sword';
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
    new Monster('Igor', 'Pferd-Herrscher', { src: 'igor.png', alt: 'Igor' }, MonsterSpezies.Herrscher, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 50),
    new Monster('Gerian', 'Troll', { src: 'gerian.png', alt: 'Gerian' }, MonsterSpezies.Troll, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 20),
    new Monster('Lina', 'Drachen-Hexe', { src: 'lina.jpg', alt: 'Lina' }, MonsterSpezies.Hexe, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 40),
    new Monster('Lilli', 'Drachen-Assasinin', { src: 'lilli.jpg', alt: 'Lilli' }, MonsterSpezies.Assasine, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 60),
    new Monster('Max', 'Troll', { src: 'max.jpg', alt: 'Max' }, MonsterSpezies.Troll, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => this.fight() }, 20),
    new Monster('Jannik', 'Zombie', { src: 'jannik.jpg', alt: 'Jannik' }, MonsterSpezies.Zombie, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 30),
    new Monster('Julius', 'Ork', { src: 'julius.jpg', alt: 'Julius' }, MonsterSpezies.Ork, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 30),
    new Monster('Leif', 'Zombie', { src: 'leif.jpg', alt: 'Leif' }, MonsterSpezies.Zombie, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 20),
    new Monster('Jonah', 'Dementor', { src: 'jonah.jpg', alt: 'Jonah' }, MonsterSpezies.Dementor, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 30)
  ]

  public allBosses: Boss[] = [
    new Boss(0, 'Peter', 'Affen-Herrscher', { src: './assets/card-image/', alt: 'Peter' }, MonsterSpezies.Riesenaffe, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 500),
    new Boss(1, 'Daniel', 'Drache', { src: 'daniel.png', alt: 'Daniel' }, MonsterSpezies.Drache, { content: 'Gehen', show: true, click: () => { this.go() } }, { content: 'Kämpfen', show: true, click: () => { this.fight() } }, 1000),
    //new Boss('Lukas')
    //new Boss('Momme', ''),
    //new Boss('Felipe')
  ]

  public allItems: Item[] = [
    new Potion('potion_heal', 'Heilungstrank', '', 0, 5, 0, 10, { src: 'position_heal.png', alt: 'Trank' }, 0),
    new Sword('sword_wood', 'Holzschwert', '', 2, 0, 0, 20, { src: 'sword_wood.png', alt: 'Schwert' }, 5),
    new Armor('armor_lether', 'Lederrüstung', '', 0, 0, 5, 20, { src: 'armor_lether.png', alt: 'Rüstung' }, 5),
    new Sword('sword_eisen', 'Eisenschwert', '', 5, 0, 0, 50, { src: 'sword_eisen.png', alt: 'Eisenschwert' }, 20),
    new Potion('potion_strength', 'Stärketrank', '', 10, 0, 0, 80, { src: 'position_strength.png', alt: 'Stärketrank' }, 5),
    new Sword('sword_gold', 'Goldschwert', '', 15, 0, 0, 100, { src: 'sword_gold.png', alt: 'Goldschwert' }, 15)
  ]

  public fee: Fee = new Fee();

  public inventory: any[] = [
    this.getItemByIdName('sword_wood'),
    this.getItemByIdName('armor_lether'),

  ]

  public enemy = new Monster('Henrik', 'Tutorial-Goblin', { src: 'tutorial-goblin.jpg', alt: 'Henrik' }, MonsterSpezies.Goblin, { content: '', show: false, click: () => { } }, { content: 'Kämpfen', show: true, click: () => { this.fight(); } }, 10);

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
      // attack the enemy
      if (this.enemy.stats.shield > 0) {  // if the enemy have shield
        let attack = this.user.attack - this.enemy.stats.shield; // save the attack
        this.enemy.stats.shield -= this.user.attack; // attack the shield
        if (attack > 0) { // if attack is over 0 remove the rest from the life
          this.enemy.stats.life -= attack;
        }
      } else { // if the enemy doesn't have shield
        this.enemy.stats.life -= this.user.attack;
      }
      if (this.enemy.stats.life < 0) {
        this.enemy.stats.life = 0;
      }
      if (this.enemy.stats.shield < 0) {
        this.enemy.stats.shield = 0;
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
        // attack the user
        if (this.user.shield > 0) {  // if the user have shield
          let attack = this.enemy.stats.attack - this.user.shield; // save the attack
          this.user.shield -= this.enemy.stats.attack; // attack the shield
          if (attack > 0) { // if attack is over 0 remove the rest from the life
            this.user.health -= attack;
          }
        } else { // if the user doesn't have shield
          this.user.health -= this.enemy.stats.attack;
        }
        if (this.user.shield < 0) {
          this.user.shield = 0;
        }
        this.saveInLocalStorage(this.user, this.enemy);
        this.actionIsRunning = false;
        this.checkIfTheUserIsDead();
      }, 400);
    }
  }

  public go() {
    if (!this.actionIsRunning) {
      this.actionIsRunning = true;
      this.card[0].classList.remove('shake'); // to prevent design bugs
      let random = Math.floor(Math.random() * 5) + 1;
      if (random == 3) { // 20% chance
        this.card[0].classList.add('fallUp');
        setTimeout(() => {
          this.card[0].classList.add('shake');
          this.card[0].classList.remove('fallUp');
          setTimeout(() => {
            this.user.health -= this.enemy.stats.attack; // attack the user
            this.checkIfTheUserIsDead();
            this.actionIsRunning = false;
          }, 500);
        }, 850);
      } else {
        this.actionIsRunning = false;
        this.newCard();
      }
    }
  }

  public checkIfTheUserIsDead() {
    if (this.user.health <= 0 && this.user.shield <= 0) {
      alert('Du bist tot.');
      localStorage.clear();
      location.reload();
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
        settings: 'settings' //TODO Save Settings
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

  public getItemByIdName(idName: string): any {
    for (let i = 0; i < this.allItems.length; i++) {
      const element = this.allItems[i];
      if (element.idName === idName) {
        return element;
      }
    }
    return undefined;
  }

  public getBossByName(name: string): Boss | undefined {
    for (let i = 0; i < this.allBosses.length; i++) {
      const element = this.allBosses[i];
      if (element.name === name) {
        return element;
      }
    }
    return undefined;
  }

  public getBossById(id: number): Boss | undefined {
    for (let i = 0; i < this.allBosses.length; i++) {
      const element = this.allBosses[i];
      if (element.id === id) {
        return element;
      }
    }
    return undefined;
  }

  public getAllItemsWithTheSameCategory(category: string): Item[] | undefined {
    let items: Item[] | undefined = [];
    for (let i = 0; i < this.allItems.length; i++) {
      const element = this.allItems[i];
      if (element.idName?.startsWith(category)) {
        items?.push(element);
      }
    }
    return items;
  }
}
