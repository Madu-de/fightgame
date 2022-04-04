import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private router: Router, private user: UserService) { }

  public enemy = {
    name: 'Henrik',
    description: 'Tutorial-Goblin',
    image: {
      src: './assets/card-images/tutorial-goblin.jpg',
      alt: 'Henrik'
    },
    spezies: 'Goblin',
    stats: {
      attack: 0.5,
      life: 1,
      shield: 0
    },
    buttonLeft: {
      content: 'Gehen',
      show: true,
      click: () => { }
    },
    buttonRight: {
      content: 'Kämpfen',
      show: true,
      click: () => {
        this.enemy.stats = this.fight(this.enemy.stats);
      }
    }
  }

  public checkData(withData: string, withoutData: string) { // Check the localstorage of the client
    let data = this.getDataFromLocalStorage();
    if (data != false) {
      this.router.navigateByUrl('/' + withData);
    } else {
      this.router.navigateByUrl('/' + withoutData);
    }
  }

  public fight(enemy: any): any {
    enemy.life -= this.user.attack;
    this.user.health -= enemy.attack;
    if (enemy.life <= 0) { // check if the enemy is dead
      this.user.addXp(30); // TODO give xp and more;
      this.newCard();
    }
    this.saveInLocalStorage(this.user, this.enemy);
    return enemy;
  }
  public newCard() {
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
}
