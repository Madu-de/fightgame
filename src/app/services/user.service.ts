import { Injectable } from '@angular/core';
import { Gender } from '../enums/Gender.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public username: string = 'Madu';
  public gender: Gender = Gender.men; // men, women or non binary
  public health: number = 100;
  public attack: number = 20;
  public shield: number = 0;
  public lvl: number = 2;
  public xp: number = 20;
  public gold: number = 20;

}
