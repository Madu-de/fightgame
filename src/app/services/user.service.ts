import { Injectable } from '@angular/core';
import { Gender } from '../enums/gender.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public username: string = '';
  public gender: Gender = Gender.men; // men or women
  public health: number = 0;
  public attack: number = 0;
  public shield: number = 0;
  public lvl: number = 0;
  public xp: number = 0;
  public gold: number = 0;

  public addXp(xp: number) {
    this.xp += xp;
    if (this.xp >= 100) {
      setTimeout(() => {
        while (this.xp >= 100) {
          this.lvl++;
          this.xp -= 100;
        }
      }, 100)
    }
  }
}
