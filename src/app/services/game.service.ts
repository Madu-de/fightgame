import { Injectable } from '@angular/core';
import { LocalStorage } from '../classes/LocalStorage';
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
      attack: 2,
      life: 50,
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
    let data = LocalStorage.getDataFromLocalhost();
    if (data != null) {
      this.router.navigateByUrl('/' + withData);
    } else {
      this.router.navigateByUrl('/' + withoutData);
    }
  }
  public fight(enemy: any): any {
    enemy.life -= this.user.attack;
    this.user.health -= enemy.attack;
    if (enemy.life <= 0) { // check if the enemy is dead
      this.user.xp += 50; // TODO give xp and more;
      this.newCard();
    }
    return enemy;
  }
  public newCard() {
    alert(JSON.stringify(this.user));
  }
}
