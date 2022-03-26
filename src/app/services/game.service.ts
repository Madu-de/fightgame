import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Localhost } from '../classes/localhost';
import { Monster } from '../classes/monster';
import { Boss } from '../classes/boss';
import { Item } from '../classes/item';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  test() {
    console.log(User.username);
  }

}
