import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { Gender } from '../enums/gender.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public username: string = '';
  public gender: Gender = Gender.man; // men or women
  public health: number = 0;
  public attack: number = 0;
  public shield: number = 0;
  public lvl: number = 0;
  public xp: number = 0;
  public maxXp: number = 0;
  public gold: number = 0;

  public addXp(xp: number) {
    this.xp += xp;
    if (this.xp >= this.maxXp) {
      while (this.xp >= this.maxXp) {
        this.xp -= this.maxXp;
        this.addLvl();
      }
    }
  }

  public addLvl() {
    this.lvl++;
    this.maxXp += 20;
  }

  public getXpPercent(): number {
    let result = 100 / this.maxXp; // get 1% from the maxXp
    result = result * this.xp; // get xp in percent
    return result;
  }
}
