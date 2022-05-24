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
import { CardButton } from '../interfaces/cardButton';
import { UserService } from './user.service';

/*
TODO-List

obenrechts aktive potions anzeigen
*/

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public card = document.getElementsByClassName('card-play');

  private actionIsRunning: boolean = false;

  constructor(private router: Router, public user: UserService) { }

  // Default values for the buttons of the monsters
  private buttonLeftDefault: CardButton = { content: 'Gehen', show: true, click: () => { this.go() } };
  private buttonRightDefault: CardButton = { content: 'Kämpfen', show: true, click: () => { this.fight() } };

  public allMonsters: Monster[] = [
    new Monster('Igor', 'Pferd-Herrscher', MonsterSpezies.Herrscher, this.buttonLeftDefault, this.buttonRightDefault, 50),
    new Monster('Gerian', 'Troll', MonsterSpezies.Troll, this.buttonLeftDefault, this.buttonRightDefault, 20),
    new Monster('Lina', 'Drachen-Hexe', MonsterSpezies.Hexe, this.buttonLeftDefault, this.buttonRightDefault, 40),
    new Monster('Lilli', 'Drachen-Assasinin', MonsterSpezies.Assasine, this.buttonLeftDefault, this.buttonRightDefault, 60),
    new Monster('Max', 'Troll', MonsterSpezies.Troll, this.buttonLeftDefault, this.buttonRightDefault, 20),
    new Monster('Jannik', 'Zombie', MonsterSpezies.Zombie, this.buttonLeftDefault, this.buttonRightDefault, 30),
    new Monster('Julius', 'Ork', MonsterSpezies.Ork, this.buttonLeftDefault, this.buttonRightDefault, 30),
    new Monster('Leif', 'Zombie', MonsterSpezies.Zombie, this.buttonLeftDefault, this.buttonRightDefault, 20),
    new Monster('Jonah', 'Dementor', MonsterSpezies.Dementor, this.buttonLeftDefault, this.buttonRightDefault, 30)
  ]

  public allBosses: Boss[] = [
    new Boss(0, 'Peter', 'Affen-Herrscher', MonsterSpezies.Riesenaffe, this.buttonLeftDefault, this.buttonRightDefault, 500),
    new Boss(1, 'Daniel', 'Drache', MonsterSpezies.Drache, this.buttonLeftDefault, this.buttonRightDefault, 1000),
    //new Boss('Lukas')
    //new Boss('Momme', ''),
    //new Boss('Felipe')
  ]

  public allItems: Item[] = [
    new Sword('sword_wood', 'Holzschwert', '', 2, 0, 0, 20, 5),
    new Sword('sword_stone', 'Steinschwert', '', 15, 0, 0, 50, 30),
    new Sword('sword_iron', 'Eisenschwert', '', 20, 0, 0, 80, 20),
    new Sword('sword_gold', 'Goldschwert', '', 25, 0, 0, 100, 15),

    new Armor('armor_leather', 'Lederrüstung', '', 0, 0, 5, 20, 5),
    new Armor('armor_iron', 'Eisenrüstung', '', 0, 0, 20, 50, 20),
    new Armor('armor_gum', 'Gummi Rüstung', '', 0, 0, 50, 2500, 100),

    new Potion('potion_heal', 'Heilungstrank', '', 0, 5, 0, 10, 0),
    new Potion('potion_strength', 'Stärketrank', '', 10, 0, 0, 80, 5),
  ]

  public fee: Fee = new Fee();

  public inventory: any[] = [
  ]

  public enemy = new Monster('Henrik', 'Tutorial-Goblin', MonsterSpezies.Goblin, { content: '', show: false, click: () => { } }, this.buttonRightDefault, 10);

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

          if (this.inventory[1] != undefined) { // if the user has armor
            // attack the armor and display the new value
            if (this.user.activeArmor == undefined) {
              return;
            }
            let shieldWithoutArmor = this.user.shield - this.user.activeArmor.shield;
            this.inventory[1].shield -= this.enemy.stats.attack;
            this.manageHotbar();
            this.user.shield = shieldWithoutArmor + this.inventory[1].shield;
            if (this.user.activeArmor.shield <= 0) {
              this.user.activeArmor = undefined;
              this.inventory[1] = undefined;
            }
          } else { // when not
            this.user.shield -= attack; // attack the shield
          }

          if (attack > 0) { // if attack is over 0 remove the rest from the life
            this.user.health -= attack;
          }
        } else { // if the user doesn't have shield
          this.user.health -= this.enemy.stats.attack;
        }
        if (this.user.shield < 0) {
          this.user.shield = 0;
        }
        this.saveInLocalStorage(this.user, this.enemy, this.inventory);
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
        this.saveInLocalStorage(this.user, this.enemy, this.inventory);
        this.managePotions();
        this.manageActiveSword();
        this.saveInLocalStorage(this.user, this.enemy, this.inventory);
      }, 100);
    }, 450);
  }

  private managePotions(): void {
    let arrayHaveChanged: boolean = false;
    if (this.user.activePotions.length == 0) {
      return;
    }
    for (let i = 0; i < this.user.activePotions.length; i++) {
      const element: Potion = this.user.activePotions[i];
      if (element != undefined) {
        if (element.idName != 'potion_heal') { // heal is infinite
          element.rounds--;
          if (element.rounds <= 0) {
            this.user.removeAttack(element.attack);
            this.user.removeHealth(element.health);
            this.user.removeShield(element.shield);

            // Delete the potion from the array
            this.user.activePotions.splice(this.user.activePotions.findIndex(potion => {
              arrayHaveChanged = true;
              return potion.idName == element.idName;
            }), 1);

            if (arrayHaveChanged) { // all elements indexes has changed
              this.managePotions();
            }
          }
        }
      }
    }
  }

  private manageActiveSword() {
    if (this.user.activeSword == undefined) {
      return;
    }
    if (this.inventory[0] == undefined) {
      return;
    }
    this.user.activeSword.uses--;
    this.inventory[0].uses--;
    if (this.user.activeSword.uses <= 0) {
      this.inventory[0] = undefined;
      this.manageHotbar();
    }
  }

  /**
   * @title Manage the Hotbar
   * @description Manage the sword and armor.
   * @returns void
   */
  public manageHotbar(): void {
    let swordPast: Sword | undefined = this.user.activeSword;
    let armorPast: Armor | undefined = this.user.activeArmor;
    let swordNow: Sword | undefined = this.inventory[0];
    let armorNow: Armor | undefined = this.inventory[1];

    if (swordPast != swordNow) {
      if (swordPast != undefined) {
        this.user.removeAttack(swordPast.attack);
      }
      if (swordNow != undefined) {
        this.user.addAttack(swordNow.attack);
      }
    }

    if (armorPast != armorNow) {
      if (armorPast != undefined) {
        this.user.removeShield(armorPast.shield);
      }
      if (armorNow != undefined) {
        this.user.addShield(armorNow.shield);
      }
    }

    this.user.activeSword = swordNow;
    this.user.activeArmor = armorNow;
    this.saveInLocalStorage(this.user, this.enemy, this.inventory);
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
      this.user.activePotions = data.user.activePotions;
      this.user.activeSword = data.user.activeSword;
      this.user.activeArmor = data.user.activeArmor;

      //inventory
      this.inventory = data.inventory;

      // enemy
      this.enemy = data.enemy;
      this.enemy.buttonLeft.click = functions.buttonLeft;
      this.enemy.buttonRight.click = functions.buttonRight;

      return true;
    } catch (e) {
      return false;
    }
  }

  public saveInLocalStorage(_user: any, _enemy: any, _inventory: any): boolean {
    try {
      let data = {
        user: _user,
        enemy: _enemy,
        inventory: _inventory,
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